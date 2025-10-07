import express from 'express';
import {
  crearPresupuesto,
  getAllPresupuestos,
  getPresupuestoPorId,
  editarPresupuesto,
  eliminarPresupuesto
} from '../controllers/presupuestosController';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Presupuestos
 *   description: Endpoints para la gestión de presupuestos
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
 *     Presupuesto:
 *       type: object
 *       properties:
 *         importe_total:
 *           type: integer
 *           example: 4500
 *         fecha:
 *           type: string
 *           format: date
 *           example: "2025-10-07"
 *         id_cliente:
 *           type: integer
 *           example: 3
 *         id_usuario:
 *           type: integer
 *           example: 2
 */

/**
 * @swagger
 * /api/presupuestos:
 *   post:
 *     summary: Crear un nuevo presupuesto
 *     tags: [Presupuestos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Presupuesto'
 *     responses:
 *       201:
 *         description: Presupuesto creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Presupuesto'
 *       400:
 *         description: Error en la creación del presupuesto
 *       401:
 *         description: No autorizado
 *
 *   get:
 *     summary: Obtener todos los presupuestos
 *     tags: [Presupuestos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de presupuestos obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Presupuesto'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error al obtener los presupuestos
 */

/**
 * @swagger
 * /api/presupuestos/{id}:
 *   get:
 *     summary: Obtener un presupuesto por su ID
 *     tags: [Presupuestos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del presupuesto
 *     responses:
 *       200:
 *         description: Presupuesto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Presupuesto'
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Presupuesto no encontrado
 *
 *   put:
 *     summary: Editar un presupuesto existente
 *     tags: [Presupuestos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del presupuesto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Presupuesto'
 *     responses:
 *       200:
 *         description: Presupuesto actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Presupuesto'
 *       400:
 *         description: Error al actualizar el presupuesto
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Presupuesto no encontrado
 *
 *   delete:
 *     summary: Eliminar un presupuesto
 *     tags: [Presupuestos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del presupuesto
 *     responses:
 *       200:
 *         description: Presupuesto eliminado correctamente
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Presupuesto no encontrado
 *       500:
 *         description: Error al eliminar el presupuesto
 */

router.post('/', crearPresupuesto);
router.get('/', getAllPresupuestos);
router.get('/:id', getPresupuestoPorId);
router.put('/:id', editarPresupuesto);
router.delete('/:id', eliminarPresupuesto);

export default router;
