import express from 'express';
import {  crearCliente, getAllClientes, getClientePorId, editarCliente, eliminarCliente } from "../controllers/clientesController";

const router = express.Router();

router.post('/',crearCliente);
router.get('/', getAllClientes);
router.get('/:id', getClientePorId);
router.put('/:id', editarCliente); 
router.delete('/:id', eliminarCliente); 



export default router;