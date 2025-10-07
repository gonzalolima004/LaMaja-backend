import { Request, Response } from "express";
import { prisma } from "../index";


export const crearCliente = async (req: Request, res: Response) => {
    try {
        const {nombre, apellido, dni, direccion } = req.body;

        if (!nombre || !apellido || !dni || !direccion ){
            return res.status(400).json({ error: " Todos los campos son obligatorios"})
        }
  

        const nuevoCliente = await prisma.cliente.create({
            data: {
                nombre,
                apellido,
                dni,
                direccion,
            },
        });

        res.status(201).json({
            message: "Cliente creado correctamente",
            cliente: nuevoCliente,
        });
    } catch (error) {
        console.error("Error al crear cliente:", error);
        res.status(500).json({ error: "Error al crear cliente" });
    }

};

export const listarCliente = async (req: Request, res: Response) => {
    try {
        const clientes = await prisma.cliente.findMany({
            include: {
                presupuesto: true,
            },
        });
    } catch (error) {
        console.error("Error al listar clientes:", error);
        resizeBy.status(500).json({ error: " Error al listar clientes"});
    }

};