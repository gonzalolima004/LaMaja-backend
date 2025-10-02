import { Router } from "express";
import { crearAnimal, editarAnimal, buscarAnimal, eliminarAnimal } from "../controllers/animalController";

const router = Router();

router.post("/", crearAnimal);

router.put("/:id", editarAnimal);

router.get("/:id", buscarAnimal);

router.delete("/:id", eliminarAnimal);

export default router;
