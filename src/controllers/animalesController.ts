import { Request, Response } from 'express';


import { prisma } from "../middlewares/prisma";


export const crearAnimal = async (req: Request, res: Response) => {
  const { peso, sexo, estado, fecha_nacimiento, vacunado } = req.body;

  try {
    const nuevoAnimal = await prisma.animal.create({
      data: {
        peso: Number(peso),
        sexo,
        estado,
        fecha_nacimiento: new Date(fecha_nacimiento),
        vacunado,
      },
    });
    
    res.status(201).json({ mensaje: 'Animal creado correctamente.', animal: nuevoAnimal });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el animal.' });
  }
};

export const getAllAnimales = async (req: Request, res: Response) => {
  try {
    const animales = await prisma.animal.findMany();
    res.json(animales);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los animales.' });
  }
};

export const getAnimalPorId = async (req: Request, res: Response) => {
  const id_animal = parseInt(req.params.id);
  try {
    const animal = await prisma.animal.findUnique({
      where: { id_animal },
    });
    if (!animal) {
      res.status(404).json({ error: 'No existe animal con esta id' });
    }
    res.status(201).json({ mensaje: 'Animal obtenido correctamente.', animal: animal });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el animal' });
  }
};

export const editarAnimal = async (req: Request, res: Response) => {
  const id_animal = parseInt(req.params.id);
  const { peso, sexo, estado, fecha_nacimiento, vacunado } = req.body;

  try {
    const animalExistente = await prisma.animal.findUnique({
      where: { id_animal },
    });

    if (!animalExistente) {
      res.status(404).json({ error: 'No existe animal con esta id' });
    }

    await prisma.animal.update({
      where: { id_animal },
      data: {
        peso: Number(peso),
        sexo,
        estado,
        fecha_nacimiento: new Date(fecha_nacimiento),
        vacunado,
      },
    });

    res.json({ mensaje: 'Animal editado con éxito', animal: id_animal });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al editar el animal' });
  }
};

export const eliminarAnimal = async (req: Request, res: Response) => {
  const id_animal = parseInt(req.params.id);

  try {
    await prisma.animal.delete({
      where: { id_animal },
    });
    res.json({ mensaje: 'Animal borrado con éxito', animal: id_animal });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al borrar el animal' });
  }
};
