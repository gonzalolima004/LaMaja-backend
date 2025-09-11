import { Request, Response } from 'express';
import { prisma } from '../index';

export const crearDetalle = async (req: Request, res: Response) => {
  const { id_presupuesto, id_animal, precio } = req.body;
  try {
    const nuevoDetalle = await prisma.detalle_presupuesto.create({
      data: { id_presupuesto, id_animal, precio },
      include: { animal: true, presupuesto: true },
    });
    res.status(201).json(nuevoDetalle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el detalle de presupuesto.' });
  }
};

export const getAllDetalles = async (req: Request, res: Response) => {
  try {
    const detalles = await prisma.detalle_presupuesto.findMany({
      include: {
        animal: true,
        presupuesto: true,
      },
    });
    res.json(detalles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los detalles de presupuesto.' });
  }
};

export const getDetallePorId = async (req: Request, res: Response) => {
  const id_detalle_presupuesto = parseInt(req.params.id);
  try {
    const detalle = await prisma.detalle_presupuesto.findUnique({
      where: { id_detalle_presupuesto },
      include: {
        animal: true,
        presupuesto: true, 
      },
    });
    if (!detalle) {
      return res.status(404).json({ error: 'No existe detalle de presupuesto con esta id' });
    }
    res.json(detalle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el detalle de presupuesto' });
  }
};


export const editarDetalle = async (req: Request, res: Response) => {
  const id_detalle_presupuesto = parseInt(req.params.id);
  const { id_animal, precio } = req.body;
  try {
    const detalleExistente = await prisma.detalle_presupuesto.findUnique({
      where: { id_detalle_presupuesto },
    });

    if (!detalleExistente) {
      res.status(404).json({ error: 'No existe detalle de presupuesto con esta id.' });
      return;
    }

    await prisma.detalle_presupuesto.update({
      where: { id_detalle_presupuesto },
      data: { id_animal, precio },
    });
    res.json({ mensaje: 'Detalle de presupuesto editado con éxito', detalle: id_detalle_presupuesto });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al editar el detalle de presupuesto' });
  }
};

export const eliminarDetalle = async (req: Request, res: Response) => {
  const id_detalle_presupuesto = parseInt(req.params.id);
  try {
    await prisma.detalle_presupuesto.delete({
      where: { id_detalle_presupuesto },
    });
    res.json({ mensaje: 'Detalle de presupuesto borrado con éxito', detalle: id_detalle_presupuesto });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al borrar el detalle de presupuesto' });
  }
};
