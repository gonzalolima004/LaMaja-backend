import { Router } from "express";
import {
  crearCobro,
  editarCobro,
  listarCobros,
  buscarCobro,
  eliminarCobro,
} from "../controllers/cobroController";

const router = Router();


router.post("/", crearCobro);

router.put("/:id", editarCobro);

router.get("/", listarCobros);

router.get("/:id", buscarCobro);

router.delete("/:id", eliminarCobro);

export default router;
