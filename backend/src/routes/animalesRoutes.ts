import express from 'express';
import { crearAnimal, getAllAnimales, getAnimalPorId, editarAnimal, eliminarAnimal } from "../controllers/animalesController";

const router = express.Router();

router.post('/', crearAnimal);
router.get('/', getAllAnimales);
router.get('/:id', getAnimalPorId);
router.put('/:id', editarAnimal); 
router.delete('/:id', eliminarAnimal); 

export default router;
