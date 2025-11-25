import { Request, Response } from 'express';
import { prisma } from "../middlewares/prisma";

export const crearFacturaVenta = async (req: Request, res: Response): Promise<void> => {
  const { importe_total, fecha, tipo, id_presupuesto } = req.body;

  try {
    const presupuesto = await prisma.presupuesto.findUnique({
      where: { id_presupuesto },
      include: { facturas: true },
    });

    if (!presupuesto) {
    res.status(404).json({ error: "Presupuesto no encontrado." });
    return
    }

    const totalFacturado = presupuesto.facturas.reduce(
      (acc, factura) => acc + factura.importe_total,
      0
    );

    const restante = presupuesto.importe_total - totalFacturado;

    if (importe_total > restante) {
        res.status(400).json({
        error: `El monto supera el restante disponible (${restante}).`,
      });
    }

    const nuevaFactura = await prisma.factura_venta.create({
      data: {
        importe_total,
        fecha: new Date(fecha),
        tipo,
        presupuesto: {
          connect: { id_presupuesto },
        },
      },
      include: {
        presupuesto: {
          include: { cliente: true, facturas: true },
        },
      },
    });

    res.json({
      mensaje: "Factura creada correctamente.",
      factura: nuevaFactura,
    });
  } catch (error) {
    console.error("Error al crear la factura:", error);
    res
      .status(500)
      .json({ error: "Error al crear la factura o actualizar el presupuesto." });
  }
};


export const getAllFacturaVenta = async (req: Request, res: Response) => {
  try {
    const facturas = await prisma.factura_venta.findMany({
      include: {
        presupuesto: {
          include: {
            cliente: true,
            facturas: true
          }
        },
        cobros: true
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
        presupuesto: true,
        cobros: true
      }
    });
    if (!factura) {
      res.status(404).json({ error: 'No existe factura con esta id' });
    }
    res.json({ mensaje: 'Factura obtenida correctamente', factura });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la factura' });
  }
};


export const editarFacturaVenta = async (req: Request, res: Response) => {
  const id_factura_venta = parseInt(req.params.id);
  const { importe_total, fecha, tipo, id_presupuesto } = req.body;

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
        presupuesto: {
          connect: { id_presupuesto }
        }
      }
    });

    res.json({ mensaje: 'Factura editada correctamente', factura: facturaEditada });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al editar la factura' });
  }
};


export const eliminarFacturaVenta = async (req: Request, res: Response) => {
  const id_factura_venta = parseInt(req.params.id);

  try {
    await prisma.factura_venta.delete({
      where: { id_factura_venta }
    });
    res.json({ mensaje: 'Factura borrada correctamente', factura: id_factura_venta });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al borrar la factura' });
  }
};
