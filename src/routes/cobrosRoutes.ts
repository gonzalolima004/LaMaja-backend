import express from 'express';
import { crearCobro, getAllCobros, getCobroPorId, eliminarCobro } from '../controllers/cobrosController';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Cobros
 *   description: Endpoints para la gestión de cobros
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
 *     Cobro:
 *       type: object
 *       properties:
 *         importe_total:
 *           type: number
 *           format: decimal
 *           example: 1500.50
 *         fecha:
 *           type: string
 *           format: date
 *           example: "2025-10-07"
 *         id_metodo_pago:
 *           type: integer
 *           example: 2
 *         id_factura_venta:
 *           type: integer
 *           example: 1
 */

/**
 * @swagger
 * /api/cobros:
 *   post:
 *     summary: Crear un nuevo cobro
 *     tags: [Cobros]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cobro'
 *     responses:
 *       201:
 *         description: Cobro creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cobro'
 *       400:
 *         description: Error en la creación del cobro
 *       401:
 *         description: No autorizado
 *
 *   get:
 *     summary: Obtener todos los cobros
 *     tags: [Cobros]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de cobros obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cobro'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error al obtener los cobros
 */

/**
 * @swagger
 * /api/cobros/{id}:
 *   get:
 *     summary: Obtener un cobro por su ID
 *     tags: [Cobros]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cobro
 *     responses:
 *       200:
 *         description: Cobro encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cobro'
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Cobro no encontrado
 *
 *   delete:
 *     summary: Eliminar un cobro
 *     tags: [Cobros]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cobro
 *     responses:
 *       200:
 *         description: Cobro eliminado correctamente
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Cobro no encontrado
 *       500:
 *         description: Error al eliminar el cobro
 */

router.post('/', crearCobro);
router.get('/', getAllCobros);
router.get('/:id', getCobroPorId);
router.delete('/:id', eliminarCobro);

export default router;
