import { Request, Response } from 'express';
import { prisma } from "../middlewares/prisma";

// Crear cobro
export const crearCobro = async (req: Request, res: Response) => {
  const { 
    importe_total,
    id_metodo_pago,
    titular,
    id_factura_venta        
  } = req.body;

  try {
    const nuevoCobro = await prisma.cobro.create({
      data: {
        importe_total,
        fecha: new Date(),
        id_metodo_pago,
        id_factura_venta
      },
    });

    // Si el pago es con tarjeta
    if (id_metodo_pago === 2) {
      await prisma.tarjeta.create({
        data: {
          id_cobro: nuevoCobro.id_cobro,
          titular,
        },
      });
    }

    // Si el pago es con transferencia
    if (id_metodo_pago === 3) {
      await prisma.transferencia.create({
        data: {
          id_cobro: nuevoCobro.id_cobro,
          titular,
        },
      });
    }

    // Incluimos la factura y su presupuesto (que contiene el cliente)
    const cobroCompleto = await prisma.cobro.findUnique({
      where: { id_cobro: nuevoCobro.id_cobro },
      include: { 
        metodo_pago: true, 
        tarjeta: true, 
        transferencia: true,
        factura_venta: {
          include: {
            presupuesto: {
              include: { cliente: true },
            },
          },
        },
      },
    });

    res.status(201).json({ mensaje: 'Cobro creado correctamente.', cobro: cobroCompleto });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el cobro.' });
  }
};

// Obtener todos los cobros (con factura y cliente)
export const getAllCobros = async (req: Request, res: Response) => {
  try {
    const cobros = await prisma.cobro.findMany({
      include: { 
        metodo_pago: true, 
        tarjeta: true, 
        transferencia: true,
        factura_venta: {
          include: {
            presupuesto: {
              include: { cliente: true },
            },
          },
        },
      },
      orderBy: { fecha: 'desc' },
    });

    // 🔹 Arreglo adicional: asegurar que todos tengan método de pago visible
    const cobrosCompletos = cobros.map((c) => ({
      ...c,
      metodo_pago: c.metodo_pago || {
        nombre_metodo_pago:
          c.id_metodo_pago === 1
            ? 'Efectivo'
            : c.id_metodo_pago === 2
            ? 'Tarjeta de Crédito/Débito'
            : 'Transferencia Bancaria',
      },
    }));

    res.json(cobrosCompletos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los cobros.' });
  }
};

// Obtener cobro por ID
export const getCobroPorId = async (req: Request, res: Response) => {
  const id_cobro = parseInt(req.params.id);
  try {
    const cobro = await prisma.cobro.findUnique({
      where: { id_cobro },
      include: { 
        metodo_pago: true, 
        tarjeta: true, 
        transferencia: true,
        factura_venta: {
          include: {
            presupuesto: {
              include: { cliente: true },
            },
          },
        },
      },
    });

    if (!cobro) {
      res.status(404).json({ error: 'No existe el cobro con esta id' });
      return;
    }

    res.status(200).json({ mensaje: 'Cobro obtenido correctamente.', cobro });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el cobro.' });
  }
};

// Eliminar cobro
export const eliminarCobro = async (req: Request, res: Response) => {
  const id_cobro = parseInt(req.params.id);
  try {
    await prisma.cobro.delete({
      where: { id_cobro },
    });
    res.json({ mensaje: 'Cobro borrado con éxito', cobro: id_cobro });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al borrar el cobro.' });
  }
};
