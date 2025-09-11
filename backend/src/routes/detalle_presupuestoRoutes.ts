import express from 'express';
import { crearDetalle, getAllDetalles, getDetallePorId, editarDetalle, eliminarDetalle } from '../controllers/detalle_presupuestoController';

const router = express.Router();

router.post('/', crearDetalle);
router.get('/', getAllDetalles);
router.get('/:id', getDetallePorId);
router.put('/:id', editarDetalle);
router.delete('/:id', eliminarDetalle);

export default router;
