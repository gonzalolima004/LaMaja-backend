import { Request, Response } from 'express';
import { prisma } from "../middlewares/prisma";

export const crearCliente = async (req: Request, res: Response) => {
  const {
    nombre,
    apellido,
    dni,
    direccion
  } = req.body
  try {
    const nuevoCliente = await prisma.cliente.create({
      data: {
        nombre: nombre,
        apellido: apellido,
        dni: dni,
        direccion: direccion,
      }
    })
    res.status(201).json({
        mensaje: 'Cliente creado correctamente.',
        cliente: nuevoCliente,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el cliente.' });
  }
}


export const getAllClientes = async (req: Request, res: Response) => {
  try {
    const clientes = await prisma.cliente.findMany({});
    res.json(clientes)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Error al obtener los clientes" })
  }
}

export const getClientePorId = async (req: Request, res: Response) => {
  const id_cliente = parseInt(req.params.id)
  try {
    const cliente = await prisma.cliente.findUnique({
      where: {
        id_cliente: id_cliente
      }
    });
    if (!cliente) {
      res.status(404).json({ error: 'No existe cliente registrado con esta id' });
    }
    res.status(201).json({ mensaje: 'Cliente obtenido correctamente.', cliente: cliente });
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Error al obtener el cliente" })
  }
}


export const editarCliente = async (req: Request, res: Response) => {
  const id_cliente = parseInt(req.params.id);
  const { nombre,
          apellido,
          dni,
          direccion
        } = req.body;
  try {
    const clienteExistente = await prisma.cliente.findUnique({
      where: { id_cliente },
    });

    if (!clienteExistente) {
      res.status(404).json({ error: 'Este usuario no hizo una queja.' });
      return;
    }

    await prisma.cliente.update({
      where: { id_cliente },
      data: { nombre: nombre,
              apellido: apellido,
              dni: dni,
              direccion: direccion
            },
    });
    res.json({ mensaje: 'Cliente editado con éxito ', cliente: id_cliente });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al editar el cliente" })
  }
}

export const eliminarCliente = async (req: Request, res: Response) => {
  const id_cliente = parseInt(req.params.id);
  try {
    await prisma.cliente.delete({
      where: {
        id_cliente: id_cliente
      },
    });
    res.json({ mensaje: 'Cliente borrado con éxito ', cliente: id_cliente });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al borrar el cliente' });
  }
};
