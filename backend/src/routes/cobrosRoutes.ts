import express from 'express';
import { crearCobro, getAllCobros, getCobroPorId, eliminarCobro } from "../controllers/cobrosController";

const router = express.Router();

router.post('/', crearCobro);
router.get('/', getAllCobros);
router.get('/:id', getCobroPorId);
router.delete('/:id', eliminarCobro); 

export default router;
