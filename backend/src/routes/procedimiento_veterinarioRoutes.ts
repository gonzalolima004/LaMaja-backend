import express from 'express';
import {  crearProcedimiento, getAllProcedimientos, getProcedimientoPorId, editarProcedimiento, eliminarProcedimiento } from "../controllers/procedimiento_veterinarioController";

const router = express.Router();

router.post('/', crearProcedimiento);
router.get('/', getAllProcedimientos);
router.get('/:id', getProcedimientoPorId);
router.put('/:id', editarProcedimiento); 
router.delete('/:id', eliminarProcedimiento); 


export default router;