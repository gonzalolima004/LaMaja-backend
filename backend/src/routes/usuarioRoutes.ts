import { Router } from "express";
import { registrarUsuario, loginUsuario, obtenerUsuarios, obtenerUsuarioPorId, eliminarUsuario } from "../controllers/usuarioController";

const router = Router();

router.post("/registrar", registrarUsuario);
router.post("/login", loginUsuario);
router.get("/", obtenerUsuarios);
router.get("/:id", obtenerUsuarioPorId);
router.delete("/:id", eliminarUsuario);

export default router;
