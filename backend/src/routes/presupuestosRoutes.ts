import express from 'express';
import { crearPresupuesto, getAllPresupuestos, getPresupuestoPorId, editarPresupuesto, eliminarPresupuesto } from "../controllers/presupuestosController";

const router = express.Router();

router.post('/', crearPresupuesto);
router.get('/', getAllPresupuestos);
router.get('/:id', getPresupuestoPorId);
router.put('/:id', editarPresupuesto); 
router.delete('/:id', eliminarPresupuesto); 

export default router;
