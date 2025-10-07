import { Request, Response } from 'express';
import { prisma } from '../index';

export const crearFacturaVenta = async (req: Request, res: Response) => {
  const { importe_total, fecha, tipo, id_cobro, id_presupuesto } = req.body;

  try {
    const nuevaFactura = await prisma.factura_venta.create({
      data: {
        importe_total,
        fecha: new Date(fecha),
        tipo,
        cobro: {
          connect: { id_cobro }
        },
        presupuesto: {
          connect: { id_presupuesto }
        }
      }
    });
    res.status(201).json(nuevaFactura);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la factura de venta.' });
  }
};

export const getAllFacturaVenta = async (req: Request, res: Response) => {
  try {
    const facturas = await prisma.factura_venta.findMany({
      include: {
        cobro: true,
        presupuesto: true
      }
    });
    res.json(facturas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las facturas de venta.' });
  }
};

export const getFacturaVentaPorId = async (req: Request, res: Response) => {
  const id_factura_venta = parseInt(req.params.id);
  try {
    const factura = await prisma.factura_venta.findUnique({
      where: { id_factura_venta },
      include: {
        cobro: true,
        presupuesto: true
      }
    });
    if (!factura) {
      res.status(404).json({ error: 'No existe factura con esta id' });
    }
    res.json(factura);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la factura de venta.' });
  }
};

export const editarFacturaVenta = async (req: Request, res: Response) => {
  const id_factura_venta = parseInt(req.params.id);
  const { importe_total, fecha, tipo, id_cobro, id_presupuesto } = req.body;

  try {
    const facturaExistente = await prisma.factura_venta.findUnique({
      where: { id_factura_venta }
    });

    if (!facturaExistente) {
      res.status(404).json({ error: 'No existe factura con esta id' });
    }

    const facturaEditada = await prisma.factura_venta.update({
      where: { id_factura_venta },
      data: {
        importe_total,
        fecha: new Date(fecha),
        tipo,
        cobro: {
          connect: { id_cobro }
        },
        presupuesto: {
          connect: { id_presupuesto }
        }
      }
    });

    res.json({ mensaje: 'Factura de venta editada con éxito', factura: facturaEditada });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al editar la factura de venta.' });
  }
};

export const eliminarFacturaVenta = async (req: Request, res: Response) => {
  const id_factura_venta = parseInt(req.params.id);

  try {
    await prisma.factura_venta.delete({
      where: { id_factura_venta }
    });
    res.json({ mensaje: 'Factura de venta borrada con éxito', factura: id_factura_venta });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al borrar la factura de venta.' });
  }
};
