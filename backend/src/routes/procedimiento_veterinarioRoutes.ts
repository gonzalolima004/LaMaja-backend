import express from 'express';
import { crearProcedimiento, getAllProcedimientos, getProcedimientoPorId, editarProcedimiento, eliminarProcedimiento } from '../controllers/procedimiento_veterinarioController';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: ProcedimientosVeterinarios
 *   description: Endpoints para la gestión de procedimientos veterinarios
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
 *     ProcedimientoVeterinario:
 *       type: object
 *       properties:
 *         tipo:
 *           type: string
 *           example: "Vacunación"
 *         fecha:
 *           type: string
 *           format: date
 *           example: "2025-10-07"
 *         id_animal:
 *           type: integer
 *           example: 5
 */

/**
 * @swagger
 * /api/procedimientos:
 *   post:
 *     summary: Crear un nuevo procedimiento veterinario
 *     tags: [ProcedimientosVeterinarios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProcedimientoVeterinario'
 *     responses:
 *       201:
 *         description: Procedimiento creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProcedimientoVeterinario'
 *       400:
 *         description: Error en la creación del procedimiento
 *       401:
 *         description: No autorizado
 *
 *   get:
 *     summary: Obtener todos los procedimientos veterinarios
 *     tags: [ProcedimientosVeterinarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de procedimientos obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProcedimientoVeterinario'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error al obtener los procedimientos
 */

/**
 * @swagger
 * /api/procedimientos/{id}:
 *   get:
 *     summary: Obtener un procedimiento veterinario por su ID
 *     tags: [ProcedimientosVeterinarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del procedimiento veterinario
 *     responses:
 *       200:
 *         description: Procedimiento encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProcedimientoVeterinario'
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Procedimiento no encontrado
 *
 *   put:
 *     summary: Editar un procedimiento veterinario existente
 *     tags: [ProcedimientosVeterinarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del procedimiento veterinario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProcedimientoVeterinario'
 *     responses:
 *       200:
 *         description: Procedimiento actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProcedimientoVeterinario'
 *       400:
 *         description: Error al actualizar el procedimiento
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Procedimiento no encontrado
 *
 *   delete:
 *     summary: Eliminar un procedimiento veterinario
 *     tags: [ProcedimientosVeterinarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del procedimiento veterinario
 *     responses:
 *       200:
 *         description: Procedimiento eliminado correctamente
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Procedimiento no encontrado
 *       500:
 *         description: Error al eliminar el procedimiento
 */

router.post('/', crearProcedimiento);
router.get('/', getAllProcedimientos);
router.get('/:id', getProcedimientoPorId);
router.put('/:id', editarProcedimiento);
router.delete('/:id', eliminarProcedimiento);

export default router;
