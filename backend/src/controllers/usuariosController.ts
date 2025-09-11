import { Request, Response } from 'express';
import { prisma } from '../index';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

function mayusculaInicial(str: string): string {
  return str
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(' ');
}

export const registrar = async (req: Request, res: Response): Promise<void> => {
  const {
    nombre,
    apellido,
    dni,
    email,
    contrasena,
    id_rol,      
    nombre_rol,
    matricula  
  } = req.body;

  const nombreCapitalizado = mayusculaInicial(nombre);
  const apellidoCapitalizado = mayusculaInicial(apellido);

  try {
    const buscarExistencia = await prisma.usuario.findUnique({ where: { email } });
    if (buscarExistencia) {
      res.status(400).json({ error: 'Ya existe un usuario con ese email.' });
      return;
    }

    const hash = await bcrypt.hash(contrasena, 10);

    let idRolFinal: number;

    if (id_rol) {
      idRolFinal = id_rol;
    } else if (nombre_rol) {
      const rol = await prisma.rol.findFirst({ where: { nombre_rol } });
      if (!rol) {
        res.status(400).json({ error: `El rol "${nombre_rol}" no existe.` });
        return;
      }
      idRolFinal = rol.id_rol;
    } else {
      res.status(400).json({ error: "Debes proporcionar un rol (id_rol o nombre_rol)." });
      return;
    }

    let dataUsuario: any = {
      nombre: nombreCapitalizado,
      apellido: apellidoCapitalizado,
      dni,
      email,
      contrasena: hash,
      id_rol: idRolFinal
    };

    if (idRolFinal === 2) {
      if (!matricula) {
        res.status(400).json({ error: "Debes proporcionar la matrícula para un veterinario." });
        return;
      }

      const nuevoUsuario = await prisma.usuario.create({
        data: {
          ...dataUsuario,
          veterinario: {
            create: { matricula }
          }
        },
        include: { rol: true, veterinario: true }
      });

      res.status(201).json({
        mensaje: 'Veterinario registrado correctamente.',
        usuario: nuevoUsuario,
      });
      return;
    }

    const nuevoUsuario = await prisma.usuario.create({
      data: dataUsuario,
      include: { rol: true },
    });

    res.status(201).json({
      mensaje: 'Usuario registrado correctamente.',
      usuario: nuevoUsuario,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar usuario.' });
  }
};


export const login = async (req: Request, res: Response) => {
  const { email, contrasena } = req.body;
  try {
    const usuario = await prisma.usuario.findUnique({
      where: { email },
      include: { rol: true },
    });

    if (!usuario) {
      res.status(404).json({ error: 'Usuario no encontrado.' });
      return;
    }

    const validarcontrasena = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!validarcontrasena) {
      res.status(401).json({ error: 'Contraseña incorrecta.' });
      return;
    }

    const { contrasena: _, ...usuarioincontrasena } = usuario;

    if (!JWT_SECRET) {
      res.status(500).json({ error: 'JWT_SECRET no está definido en las variables de entorno.' });
      return;
    }

    const token = jwt.sign(
      {
        id: usuario.id_usuario,
        email: usuario.email,
        rol: usuario.rol.nombre_rol,
      },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      mensaje: 'Inicio de sesión exitoso',
      token,
      usuario: usuarioincontrasena,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al iniciar sesión.' });
  }
};

export const verifyToken = (req: Request, res: Response): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Token no proporcionado." });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    if (!JWT_SECRET) {
      res.status(500).json({ error: "No hay secreto configurado" });
      return;
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    res.status(200).json({ valid: true, decoded });
  } catch (err) {
    res.status(403).json({ message: "Token inválido o expirado." });
  }
};

// export const getAllUsuarios = async (req: Request, res: Response) => {
//   try {
//     const usuarios = await prisma.usuario.findMany({});
//     res.json(usuarios)
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ error: "Error al obtener los usuarios" })
//   }
// }

export const getAllUsuarios = async (req: Request, res: Response) => {
  try {
    const usuarios = await prisma.usuario.findMany({
      select: {
        id_usuario: true,
        nombre: true,
        apellido: true,
        dni: true,
        email: true,
        id_rol: true,
        rol: {
          select: {
            nombre_rol: true
          }
        },
        veterinario: {
          select: {
            matricula: true
          }
        }
      }
    });

    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};
