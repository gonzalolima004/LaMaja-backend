import { Request, Response } from 'express';
import { prisma } from '../index';

export const crearPresupuesto = async (req: Request, res: Response) => {
  const { importe_total, fecha, detalles, cliente } = req.body;

  try {
    // Crear cliente primero
    const clienteCreado = await prisma.cliente.create({
      data: {
        nombre: cliente.nombre,
        apellido: cliente.apellido,
        dni: cliente.dni,
        direccion: cliente.direccion
      }
    });

    // Crear presupuesto relacionado al cliente
    const nuevoPresupuesto = await prisma.presupuesto.create({
      data: {
        importe_total,
        fecha: new Date(fecha),
        id_cliente: clienteCreado.id_cliente,
        detalles: {
          create: detalles.map((d: any) => ({
            id_animal: d.id_animal,
            precio: d.precio
          }))
        }
      },
      include: {
        cliente: true,
        facturas: true,
        detalles: { include: { animal: true } }
      }
    });

    res.json({
      mensaje: 'Presupuesto creado correctamente',
      presupuesto: nuevoPresupuesto
    });
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
        facturas: true,
        detalles: { include: { animal: true } }
      }
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
        facturas: true,
        detalles: { include: { animal: true } }
      }
    });
    if (!presupuesto) {
      res.status(404).json({ error: 'No existe presupuesto con esta id' });
    }
    res.json({ mensaje: 'Presupuesto obtenido correctamente', presupuesto: presupuesto });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el presupuesto.' });
  }
};

export const editarPresupuesto = async (req: Request, res: Response) => {
  const id_presupuesto = parseInt(req.params.id);
  const { importe_total, fecha, id_cliente } = req.body;

  try {
    const presupuestoExistente = await prisma.presupuesto.findUnique({
      where: { id_presupuesto }
    });

    if (!presupuestoExistente) {
      res.status(404).json({ error: 'No existe presupuesto con esta id' });
    }

    const presupuestoEditado = await prisma.presupuesto.update({
      where: { id_presupuesto },
      data: {
        importe_total,
        fecha: new Date(fecha),
        cliente: {
          connect: { id_cliente }
        },
      },
      include: {
        cliente: true,
        facturas: true,
        detalles: { include: { animal: true } }
      }
    });

    res.json({ mensaje: 'Presupuesto editado correctamente', presupuesto: presupuestoEditado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al editar el presupuesto.' });
  }
};

export const eliminarPresupuesto = async (req: Request, res: Response) => {
  const id_presupuesto = parseInt(req.params.id);

  try {
    await prisma.presupuesto.delete({
      where: { id_presupuesto }
    });
    res.json({ mensaje: 'Presupuesto borrado correctamente', presupuesto: id_presupuesto });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al borrar el presupuesto.' });
  }
};
