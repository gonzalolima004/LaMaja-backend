import { Request, Response } from 'express';
import { prisma } from '../index';

export const crearProcedimiento = async (req: Request, res: Response) => {
  const { 
        tipo, 
        fecha,
        id_animal 
        } = req.body;

  try {
    const nuevoProcedimiento = await prisma.procedimiento_veterinario.create({
      data: {
        tipo,
        fecha: new Date(fecha),
        id_animal,
      },
    });
    res.status(201).json(nuevoProcedimiento);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el procedimiento.' });
  }
};

export const getAllProcedimientos = async (req: Request, res: Response) => {
  try {
    const procedimientos = await prisma.procedimiento_veterinario.findMany();
    res.json(procedimientos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los procedimientos.' });
  }
};

export const getProcedimientoPorId = async (req: Request, res: Response) => {
  const id_procedimiento_veterinario = parseInt(req.params.id);
  try {
    const procedimiento = await prisma.procedimiento_veterinario.findUnique({
      where: { id_procedimiento_veterinario },
    });
    if (!procedimiento) {
      res.status(404).json({ error: 'No existe procedimiento con esta id' });
    }
    res.json(procedimiento);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el procedimiento' });
  }
};

export const editarProcedimiento = async (req: Request, res: Response) => {
  const id_procedimiento_veterinario = parseInt(req.params.id);
  const { 
        tipo,
        fecha,
        } = req.body;

  try {
    const procedimientoExistente = await prisma.procedimiento_veterinario.findUnique({
      where: { id_procedimiento_veterinario },
    });

    if (!procedimientoExistente) {
      res.status(404).json({ error: 'No existe procedimiento con esta id' });
    }

    await prisma.procedimiento_veterinario.update({
      where: { id_procedimiento_veterinario },
      data: {
        tipo,
        fecha: new Date(fecha),
      },
    });

    res.json({ mensaje: 'Procedimiento editado con éxito', procedimiento: id_procedimiento_veterinario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al editar el procedimiento' });
  }
};

export const eliminarProcedimiento = async (req: Request, res: Response) => {
  const id_procedimiento_veterinario = parseInt(req.params.id);

  try {
    await prisma.procedimiento_veterinario.delete({
      where: { id_procedimiento_veterinario },
    });
    res.json({ mensaje: 'Procedimiento borrado con éxito', procedimiento: id_procedimiento_veterinario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al borrar el procedimiento' });
  }
};
