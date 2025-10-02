import { Request, Response } from "express";
import { prisma } from "../index";

// Crear animal
export const crearAnimal = async (req: Request, res: Response) => {
  try {
    const { peso, sexo, estado, fecha_nacimiento, vacunado } = req.body;

    if (!peso || !sexo || !estado || !fecha_nacimiento || vacunado === undefined) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const nuevoAnimal = await prisma.animal.create({
      data: {
        peso,
        sexo,
        estado,
        fecha_nacimiento: new Date(fecha_nacimiento),
        vacunado,
      },
    });

    res.status(201).json({
      message: "Animal creado correctamente",
      animal: nuevoAnimal,
    });
  } catch (error) {
    console.error("Error al crear animal:", error);
    res.status(500).json({ error: "Error al crear animal" });
  }
};

// Editar animal
export const editarAnimal = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { peso, sexo, estado, fecha_nacimiento, vacunado } = req.body;

    const animalEditado = await prisma.animal.update({
      where: { id_animal: Number(id) },
      data: {
        peso,
        sexo,
        estado,
        fecha_nacimiento: fecha_nacimiento ? new Date(fecha_nacimiento) : undefined,
        vacunado,
      },
    });

    res.json({
      message: "Animal actualizado correctamente",
      animal: animalEditado,
    });
  } catch (error) {
    console.error("Error al editar animal:", error);
    res.status(500).json({ error: "Error al editar animal" });
  }
};

// Buscar animal por ID
export const buscarAnimal = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const animal = await prisma.animal.findUnique({
      where: { id_animal: Number(id) },
    });

    if (!animal) {
      return res.status(404).json({ error: "Animal no encontrado" });
    }

    res.json({
      message: "Animal encontrado",
      animal,
    });
  } catch (error) {
    console.error("Error al buscar animal:", error);
    res.status(500).json({ error: "Error al buscar animal" });
  }
};

// Eliminar animal
export const eliminarAnimal = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.animal.delete({
      where: { id_animal: Number(id) },
    });

    res.json({ message: "Animal eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar animal:", error);
    res.status(500).json({ error: "Error al eliminar animal" });
  }
};

