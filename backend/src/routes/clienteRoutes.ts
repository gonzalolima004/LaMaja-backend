import { Router } from "express";
import { crearCliente, listarCliente } from "../controllers/clienteController";

const router = Router();

router.post("/", crearCliente);
router.get("/", listarCliente);

export default router;

