import express from 'express';
import { crearAnimal, getAllAnimales, getAnimalPorId, editarAnimal, eliminarAnimal } from "../controllers/animalesController";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Animales
 *   description: Endpoints para la gestión de animales
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
 *     Animal:
 *       type: object
 *       properties:
 *         peso:
 *           type: integer
 *           example: 250
 *         sexo:
 *           type: string
 *           example: "Macho"
 *         estado:
 *           type: string
 *           example: "Sano"
 *         fecha_nacimiento:
 *           type: string
 *           format: date
 *           example: "2022-05-14"
 *         vacunado:
 *           type: boolean
 *           example: true
 */

/**
 * @swagger
 * /api/animales:
 *   post:
 *     summary: Crear un nuevo animal
 *     tags: [Animales]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Animal'
 *     responses:
 *       201:
 *         description: Animal creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Animal'
 *       400:
 *         description: Error en la creación del animal
 *       401:
 *         description: No autorizado
 *
 *   get:
 *     summary: Obtener todos los animales
 *     tags: [Animales]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de animales obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Animal'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error al obtener los animales
 */

/**
 * @swagger
 * /api/animales/{id}:
 *   get:
 *     summary: Obtener un animal por su ID
 *     tags: [Animales]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del animal
 *     responses:
 *       200:
 *         description: Animal encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Animal'
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Animal no encontrado
 *
 *   put:
 *     summary: Editar un animal existente
 *     tags: [Animales]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del animal
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Animal'
 *     responses:
 *       200:
 *         description: Animal actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Animal'
 *       400:
 *         description: Error al actualizar el animal
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Animal no encontrado
 *
 *   delete:
 *     summary: Eliminar un animal
 *     tags: [Animales]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del animal
 *     responses:
 *       200:
 *         description: Animal eliminado correctamente
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Animal no encontrado
 *       500:
 *         description: Error al eliminar el animal
 */

router.post('/', crearAnimal);
router.get('/', getAllAnimales);
router.get('/:id', getAnimalPorId);
router.put('/:id', editarAnimal);
router.delete('/:id', eliminarAnimal);

export default router;
