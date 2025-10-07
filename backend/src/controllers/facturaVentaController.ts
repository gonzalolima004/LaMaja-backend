import { Request, Response } from "express";
import { prisma } from "../index";

// Crear factura de venta
export const crearFacturaVenta = async (req: Request, res: Response) => {
  try {
    const { importe_total, fecha, tipo, id_metodo_pago } = req.body;

    // Crear el cobro
    const nuevoCobro = await prisma.cobro.create({
      data: {
        importe_total,
        fecha: new Date(fecha),
        id_metodo_pago,
      },
    });

    // Crear la factura de venta asociada al cobro
    const nuevaFactura = await prisma.factura_venta.create({
      data: {
        importe_total,
        fecha: new Date(fecha),
        tipo,
        id_cobro: nuevoCobro.id_cobro,
      },
      include: { cobro: true },
    });

    res.status(201).json({
      message: "Factura de venta creada correctamente",
      factura: nuevaFactura,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear factura de venta" });
  }
};

// Editar factura de venta
export const editarFacturaVenta = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { importe_total, fecha, tipo } = req.body;

    const facturaEditada = await prisma.factura_venta.update({
      where: { id_factura_venta: Number(id) },
      data: {
        importe_total,
        fecha: fecha ? new Date(fecha) : undefined,
        tipo,
      },
      include: { cobro: true },
    });

    res.json({
      message: "Factura de venta actualizada",
      factura: facturaEditada,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al editar factura de venta" });
  }
};

// Eliminar factura de venta
export const eliminarFacturaVenta = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Primero borramos la factura
    const facturaEliminada = await prisma.factura_venta.delete({
      where: { id_factura_venta: Number(id) },
    });

    // Luego borramos el cobro asociado
    await prisma.cobro.delete({
      where: { id_cobro: facturaEliminada.id_cobro },
    });

    res.json({ message: "Factura de venta eliminada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar factura de venta" });
  }
};
