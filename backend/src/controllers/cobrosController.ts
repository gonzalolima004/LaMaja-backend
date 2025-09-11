import { Request, Response } from 'express';
import { prisma } from '../index';

export const crearCobro = async (req: Request, res: Response) => {
  const { 
        importe_total,
        id_metodo_pago,
        titular,
        cuil
        } = req.body;
  try {
    const nuevoCobro = await prisma.cobro.create({
      data: {
        importe_total,
        fecha: new Date(),
        id_metodo_pago,
      },
    });

    if (id_metodo_pago === 2) {
      await prisma.tarjeta.create({
        data: {
          id_cobro: nuevoCobro.id_cobro,
          titular,
        },
      });
    }

    if (id_metodo_pago === 3) {
      await prisma.transferencia.create({
        data: {
          id_cobro: nuevoCobro.id_cobro,
          titular,
          cuil
        },
      });
    }

    const cobroCompleto = await prisma.cobro.findUnique({
      where: { id_cobro: nuevoCobro.id_cobro },
      include: { metodo_pago: true, tarjeta: true, transferencia: true },
    });

    res.status(201).json(cobroCompleto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el cobro.' });
  }
};

export const getAllCobros = async (req: Request, res: Response) => {
  try {
    const cobros = await prisma.cobro.findMany({
      include: { metodo_pago: true, tarjeta: true, transferencia: true },
    });
    res.json(cobros);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los cobros.' });
  }
};

export const getCobroPorId = async (req: Request, res: Response) => {
  const id_cobro = parseInt(req.params.id);
  try {
    const cobro = await prisma.cobro.findUnique({
      where: { id_cobro },
      include: { metodo_pago: true, tarjeta: true, transferencia: true },
    });
    if (!cobro) {
      res.status(404).json({ error: 'No existe el cobro con esta id' });
      return;
    }
    res.json(cobro);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el cobro.' });
  }
};

export const eliminarCobro = async (req: Request, res: Response) => {
  const id_cobro = parseInt(req.params.id);
  try {
    await prisma.cobro.delete({
      where: { id_cobro },
    });
    res.json({ mensaje: 'Cobro borrado con éxito', cobro: id_cobro });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al borrar el cobro' });
  }
};
