import { Router } from "express";
import { crearFacturaVenta, editarFacturaVenta, eliminarFacturaVenta } from "../controllers/facturaVentaController";

const router = Router();

router.post("/", crearFacturaVenta);
router.put("/:id", editarFacturaVenta);
router.delete("/:id", eliminarFacturaVenta);

export default router;
