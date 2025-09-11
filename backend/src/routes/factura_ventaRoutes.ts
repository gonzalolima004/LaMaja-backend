import express from 'express';
import { crearFacturaVenta, getAllFacturaVenta, getFacturaVentaPorId, editarFacturaVenta, eliminarFacturaVenta } from "../controllers/factura_ventaController";

const router = express.Router();

router.post('/', crearFacturaVenta);
router.get('/', getAllFacturaVenta);
router.get('/:id', getFacturaVentaPorId);
router.put('/:id', editarFacturaVenta); 
router.delete('/:id', eliminarFacturaVenta); 

export default router;
