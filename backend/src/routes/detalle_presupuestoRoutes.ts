import express from 'express';
import { crearDetalle, getAllDetalles, getDetallePorId, editarDetalle, eliminarDetalle } from '../controllers/detalle_presupuestoController';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: DetallesPresupuesto
 *   description: Endpoints para la gestión de detalles de presupuesto
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
 *     DetallePresupuesto:
 *       type: object
 *       properties:
 *         id_presupuesto:
 *           type: integer
 *           example: 3
 *         id_animal:
 *           type: integer
 *           example: 7
 *         precio:
 *           type: integer
 *           example: 1200
 */

/**
 * @swagger
 * /api/detalles_presupuesto:
 *   post:
 *     summary: Crear un nuevo detalle de presupuesto
 *     tags: [DetallesPresupuesto]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DetallePresupuesto'
 *     responses:
 *       201:
 *         description: Detalle creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DetallePresupuesto'
 *       400:
 *         description: Error en la creación del detalle
 *       401:
 *         description: No autorizado
 *
 *   get:
 *     summary: Obtener todos los detalles de presupuesto
 *     tags: [DetallesPresupuesto]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de detalles obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DetallePresupuesto'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error al obtener los detalles
 */

/**
 * @swagger
 * /api/detalles_presupuesto/{id}:
 *   get:
 *     summary: Obtener un detalle de presupuesto por su ID
 *     tags: [DetallesPresupuesto]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del detalle de presupuesto
 *     responses:
 *       200:
 *         description: Detalle encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DetallePresupuesto'
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Detalle no encontrado
 *
 *   put:
 *     summary: Editar un detalle de presupuesto existente
 *     tags: [DetallesPresupuesto]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del detalle de presupuesto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DetallePresupuesto'
 *     responses:
 *       200:
 *         description: Detalle actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DetallePresupuesto'
 *       400:
 *         description: Error al actualizar el detalle
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Detalle no encontrado
 *
 *   delete:
 *     summary: Eliminar un detalle de presupuesto
 *     tags: [DetallesPresupuesto]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del detalle de presupuesto
 *     responses:
 *       200:
 *         description: Detalle eliminado correctamente
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Detalle no encontrado
 *       500:
 *         description: Error al eliminar el detalle
 */

router.post('/', crearDetalle);
router.get('/', getAllDetalles);
router.get('/:id', getDetallePorId);
router.put('/:id', editarDetalle);
router.delete('/:id', eliminarDetalle);

export default router;
