import { Request, Response } from 'express';
import { prisma } from '../index';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

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

export const recuperarContrasena = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body;

  try {
    // 1️⃣ Buscar usuario
    const usuario = await prisma.usuario.findUnique({ where: { email } });
    if (!usuario) {
      res.status(404).json({ error: 'No existe un usuario con ese email.' });
      return;
    }

    if (!JWT_SECRET) {
      res.status(500).json({ error: 'Falta JWT_SECRET en .env' });
      return;
    }

    // 2️⃣ Generar token temporal
    const tokenRecuperacion = jwt.sign(
      { id_usuario: usuario.id_usuario, email: usuario.email },
      JWT_SECRET,
      { expiresIn: '1h' } // 1 hora
    );

    // 3️⃣ Crear enlace
    const link = `${process.env.FRONTEND_URL}/restablecer/${tokenRecuperacion}`;

    // 4️⃣ Configurar transporte de correo
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    // 5️⃣ Enviar email
    await transporter.sendMail({
      from: `"La Maja" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Recuperación de contraseña - La Maja',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Recuperación de contraseña</h2>
          <p>Hola <b>${usuario.nombre}</b>, recibimos una solicitud para restablecer tu contraseña.</p>
          <p>Haz clic en el siguiente enlace para crear una nueva contraseña (válido por 1 hora):</p>
          <a href="${link}" style="display: inline-block; padding: 10px 20px; background-color: #345A35; color: #fff; text-decoration: none; border-radius: 6px;">Restablecer contraseña</a>
          <p style="margin-top: 20px;">Si no solicitaste esto, ignora este mensaje.</p>
        </div>
      `
    });

    // 6️⃣ Responder
    res.status(200).json({ mensaje: 'Correo de recuperación enviado correctamente.' });

  } catch (error) {
    console.error('Error en recuperación de contraseña:', error);
    res.status(500).json({ error: 'No se pudo enviar el correo de recuperación.' });
  }
};

export const restablecerContrasena = async (req: Request, res: Response): Promise<void> => {
  const { token, nuevaContrasena } = req.body;

  try {
    if (!JWT_SECRET) {
      res.status(500).json({ error: "Falta JWT_SECRET en .env" });
      return;
    }

    // 1️⃣ Verificar token
    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (error) {
      res.status(400).json({ error: "Token inválido o expirado." });
      return;
    }

    // 2️⃣ Buscar al usuario
    const usuario = await prisma.usuario.findUnique({
      where: { id_usuario: decoded.id_usuario },
    });

    if (!usuario) {
      res.status(404).json({ error: "Usuario no encontrado." });
      return;
    }

    // 3️⃣ Hashear nueva contraseña
    const hash = await bcrypt.hash(nuevaContrasena, 10);

    // 4️⃣ Actualizar contraseña
    await prisma.usuario.update({
      where: { id_usuario: usuario.id_usuario },
      data: { contrasena: hash },
    });

    // 5️⃣ Responder
    res.status(200).json({ message: "Contraseña restablecida correctamente." });

  } catch (error) {
    console.error("Error al restablecer contraseña:", error);
    res.status(500).json({ error: "Error interno al restablecer la contraseña." });
  }
};