import { Request, Response } from "express";
import { prisma } from "../index"; // 👈 Importamos prisma desde index.ts
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken";



export const registrarUsuario = async (req: Request, res: Response) => {
  try {
    const { nombre, apellido, dni, email, contrasena, id_rol, matricula } = req.body;

    const existe = await prisma.usuario.findUnique({ where: { email } });
    if (existe) res.status(400).json({ msg: "El email ya está registrado" });

    const hash = await bcrypt.hash(contrasena, 10);

    const usuario = await prisma.usuario.create({
      data: { nombre, apellido, dni, email, contrasena: hash, id_rol }
    });
    if (id_rol === 2) {
      if (!matricula) {
        res.status(400).json({ error: "La matrícula es obligatoria para veterinarios" });
      }

      await prisma.veterinario.create({
        data: {
          id_usuario: usuario.id_usuario,
          matricula,
        },
      });
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: "Error al registrar usuario" });
  }
};

export const loginUsuario = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, contrasena } = req.body;

    const usuario = await prisma.usuario.findUnique({ where: { email } });

    if (!usuario) {
      res.status(404).json({ msg: "Usuario no encontrado" });
      return;
    }

    const valido = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!valido) {
      res.status(401).json({ msg: "Credenciales inválidas" });
      return;
    }

    res.json({
      id: usuario.id_usuario,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      email: usuario.email,
      token: generateToken(usuario.id_usuario)
    });
  } catch (error) {
    res.status(500).json({ error: "Error en login" });
  }
};


export const obtenerUsuarios = async (_req: Request, res: Response) => {
  try {
    const usuarios = await prisma.usuario.findMany({
      include: { rol: true }
    });
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
};

export const obtenerUsuarioPorId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const usuario = await prisma.usuario.findUnique({
      where: { id_usuario: Number(id) },
      include: { rol: true }
    });

    if (!usuario)  res.status(404).json({ msg: "Usuario no encontrado" });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuario" });
  }
};

export const eliminarUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.usuario.delete({
      where: { id_usuario: Number(id) }
    });

    res.json({ msg: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar usuario" });
  }
};
