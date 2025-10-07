import { Request, Response } from "express";
import { prisma } from "../index";

// Crear cobro
export const crearCobro = async (req: Request, res: Response) => {
  try {
    const { importe_total, fecha, id_metodo_pago, tipo_cobro, titular, cuil } = req.body;

    if (!importe_total || !fecha || !id_metodo_pago || !tipo_cobro) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    // Crear cobro base
    const nuevoCobro = await prisma.cobro.create({
      data: {
        importe_total,
        fecha: new Date(fecha),
        id_metodo_pago,
      },
    });

    // Crear relación según tipo de cobro
    if (tipo_cobro === "transferencia") {
      await prisma.transferencia.create({
        data: {
          id_cobro: nuevoCobro.id_cobro,
          titular,
          cuil,
        },
      });
    } else if (tipo_cobro === "tarjeta") {
      await prisma.tarjeta.create({
        data: {
          id_cobro: nuevoCobro.id_cobro,
          titular,
        },
      });
    }

    const cobroConRelaciones = await prisma.cobro.findUnique({
      where: { id_cobro: nuevoCobro.id_cobro },
      include: {
        metodo_pago: true,
        transferencia: true,
        tarjeta: true,
      },
    });

    res.status(201).json({
      message: "Cobro creado correctamente",
      cobro: cobroConRelaciones,
    });
  } catch (error) {
    console.error("Error al crear cobro:", error);
    res.status(500).json({ error: "Error al crear cobro" });
  }
};

// Editar cobro
export const editarCobro = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { importe_total, fecha, id_metodo_pago } = req.body;

    const cobroEditado = await prisma.cobro.update({
      where: { id_cobro: Number(id) },
      data: {
        importe_total,
        fecha: fecha ? new Date(fecha) : undefined,
        id_metodo_pago,
      },
      include: {
        metodo_pago: true,
        transferencia: true,
        tarjeta: true,
      },
    });

    res.json({
      message: "Cobro actualizado correctamente",
      cobro: cobroEditado,
    });
  } catch (error) {
    console.error("Error al editar cobro:", error);
    res.status(500).json({ error: "Error al editar cobro" });
  }
};

// Listar cobros
export const listarCobros = async (req: Request, res: Response) => {
  try {
    const cobros = await prisma.cobro.findMany({
      include: {
        metodo_pago: true,
        transferencia: true,
        tarjeta: true,
      },
    });

    res.json({
      message: "Lista de cobros obtenida correctamente",
      cobros,
    });
  } catch (error) {
    console.error("Error al listar cobros:", error);
    res.status(500).json({ error: "Error al listar cobros" });
  }
};

// Buscar cobro por ID
export const buscarCobro = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const cobro = await prisma.cobro.findUnique({
      where: { id_cobro: Number(id) },
      include: {
        metodo_pago: true,
        transferencia: true,
        tarjeta: true,
      },
    });

    if (!cobro) {
      return res.status(404).json({ error: "Cobro no encontrado" });
    }

    res.json({
      message: "Cobro encontrado",
      cobro,
    });
  } catch (error) {
    console.error("Error al buscar cobro:", error);
    res.status(500).json({ error: "Error al buscar cobro" });
  }
};

// Eliminar cobro
export const eliminarCobro = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Eliminar herencia primero (transferencia/tarjeta si existe)
    await prisma.transferencia.deleteMany({
      where: { id_cobro: Number(id) },
    });
    await prisma.tarjeta.deleteMany({
      where: { id_cobro: Number(id) },
    });

    // Luego eliminar el cobro
    await prisma.cobro.delete({
      where: { id_cobro: Number(id) },
    });

    res.json({ message: "Cobro eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar cobro:", error);
    res.status(500).json({ error: "Error al eliminar cobro" });
  }
};
