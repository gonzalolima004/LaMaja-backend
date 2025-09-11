import { Request, Response } from 'express';
import { prisma } from '../index';

export const crearPresupuesto = async (req: Request, res: Response) => {
  const { importe_total, fecha, id_cliente, id_factura_venta, id_usuario, detalles } = req.body;

  try {
    const nuevoPresupuesto = await prisma.presupuesto.create({
      data: {
        importe_total,
        fecha: new Date(fecha),
        id_cliente,
        id_factura_venta,
        id_usuario,
        detalles: {
          create: detalles, 
        },
      },
      include: {
        cliente: true,
        usuario: true,
        factura_venta: true,
        detalles: { include: { animal: true } },
      },
    });

    res.status(201).json(nuevoPresupuesto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el presupuesto.' });
  }
};

export const getAllPresupuestos = async (req: Request, res: Response) => {
  try {
    const presupuestos = await prisma.presupuesto.findMany({
      include: {
        cliente: true,
        usuario: true,
        factura_venta: true,
        detalles: { include: { animal: true } }, // <-- ahora es detalles[]
      },
    });
    res.json(presupuestos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los presupuestos.' });
  }
};

export const getPresupuestoPorId = async (req: Request, res: Response) => {
  const id_presupuesto = parseInt(req.params.id);
  try {
    const presupuesto = await prisma.presupuesto.findUnique({
      where: { id_presupuesto },
      include: {
        cliente: true,
        usuario: true,
        factura_venta: true,
        detalles: { include: { animal: true } }, // <-- detalles[]
      },
    });
    if (!presupuesto) {
      res.status(404).json({ error: 'No existe presupuesto con esta id' });
    }
    res.json(presupuesto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el presupuesto.' });
  }
};

export const editarPresupuesto = async (req: Request, res: Response) => {
  const id_presupuesto = parseInt(req.params.id);
  const { importe_total, fecha, id_cliente, id_factura_venta, id_usuario } = req.body;

  try {
    const presupuestoExistente = await prisma.presupuesto.findUnique({
      where: { id_presupuesto },
    });

    if (!presupuestoExistente) {
      res.status(404).json({ error: 'No existe presupuesto con esta id' });
    }

    const presupuestoEditado = await prisma.presupuesto.update({
      where: { id_presupuesto },
      data: {
        importe_total,
        fecha: new Date(fecha),
        id_cliente,
        id_factura_venta,
        id_usuario,
      },
      include: {
        cliente: true,
        usuario: true,
        factura_venta: true,
        detalles: { include: { animal: true } },
      },
    });

    res.json({ mensaje: 'Presupuesto editado con éxito', presupuesto: presupuestoEditado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al editar el presupuesto.' });
  }
};


export const eliminarPresupuesto = async (req: Request, res: Response) => {
  const id_presupuesto = parseInt(req.params.id);

  try {
    await prisma.presupuesto.delete({
      where: { id_presupuesto },
    });
    res.json({ mensaje: 'Presupuesto borrado con éxito', presupuesto: id_presupuesto });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al borrar el presupuesto.' });
  }
};
