import { Request, Response } from 'express';
import { prisma } from '../index';

export const crearDetalle = async (req: Request, res: Response) => {
  const { id_presupuesto, id_animal, precio } = req.body;
  try {
    const nuevoDetalle = await prisma.detalle_presupuesto.create({
      data: { id_presupuesto, id_animal, precio },
      include: { animal: true, presupuesto: true },
    });
    res.status(201).json({ mensaje: 'Detalle presupuesto creado correctamente.', detalle: nuevoDetalle });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el detalle presupuesto.' });
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
    res.status(500).json({ error: 'Error al obtener los detalles presupuesto.' });
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
      res.status(404).json({ error: 'No existe detalle presupuesto con esta id' });
    }
    res.status(201).json({ mensaje: 'Detalle presupuesto obtenido correctamente.', detalle: detalle });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el detalle presupuesto' });
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
      res.status(404).json({ error: 'No existe detalle presupuesto con esta id.' });
      return;
    }

    await prisma.detalle_presupuesto.update({
      where: { id_detalle_presupuesto },
      data: { id_animal, precio },
    });
    res.json({ mensaje: 'Detalle presupuesto editado correctamente', detalle: id_detalle_presupuesto });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al editar el detalle presupuesto' });
  }
};

export const eliminarDetalle = async (req: Request, res: Response) => {
  const id_detalle_presupuesto = parseInt(req.params.id);
  try {
    await prisma.detalle_presupuesto.delete({
      where: { id_detalle_presupuesto },
    });
    res.json({ mensaje: 'Detalle presupuesto borrado con éxito', detalle: id_detalle_presupuesto });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al borrar el detalle presupuesto' });
  }
};
