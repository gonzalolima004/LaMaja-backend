import express from 'express';
import {
  crearFacturaVenta,
  getAllFacturaVenta,
  getFacturaVentaPorId,
  editarFacturaVenta,
  eliminarFacturaVenta
} from '../controllers/factura_ventaController';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: FacturasVenta
 *   description: Endpoints para la gestión de facturas de venta
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 *   schemas:
 *     FacturaVenta:
 *       type: object
 *       properties:
 *         importe_total:
 *           type: integer
 *           example: 3200
 *         fecha:
 *           type: string
 *           format: date
 *           example: "2025-10-07"
 *         tipo:
 *           type: string
 *           example: "Factura A"
 *         id_presupuesto:
 *           type: integer
 *           example: 5
 */

/**
 * @swagger
 * /api/facturas_venta:
 *   post:
 *     summary: Crear una nueva factura de venta
 *     tags: [FacturasVenta]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FacturaVenta'
 *     responses:
 *       201:
 *         description: Factura creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FacturaVenta'
 *       400:
 *         description: Error en la creación de la factura
 *       401:
 *         description: No autorizado
 *
 *   get:
 *     summary: Obtener todas las facturas de venta
 *     tags: [FacturasVenta]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de facturas obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FacturaVenta'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error al obtener las facturas
 */

/**
 * @swagger
 * /api/facturas_venta/{id}:
 *   get:
 *     summary: Obtener una factura de venta por su ID
 *     tags: [FacturasVenta]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la factura de venta
 *     responses:
 *       200:
 *         description: Factura encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FacturaVenta'
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Factura no encontrada
 *
 *   put:
 *     summary: Editar una factura de venta existente
 *     tags: [FacturasVenta]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la factura de venta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FacturaVenta'
 *     responses:
 *       200:
 *         description: Factura actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FacturaVenta'
 *       400:
 *         description: Error al actualizar la factura
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Factura no encontrada
 *
 *   delete:
 *     summary: Eliminar una factura de venta
 *     tags: [FacturasVenta]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la factura de venta
 *     responses:
 *       200:
 *         description: Factura eliminada correctamente
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Factura no encontrada
 *       500:
 *         description: Error al eliminar la factura
 */

router.post('/', crearFacturaVenta);
router.get('/', getAllFacturaVenta);
router.get('/:id', getFacturaVentaPorId);
router.put('/:id', editarFacturaVenta);
router.delete('/:id', eliminarFacturaVenta);

export default router;
