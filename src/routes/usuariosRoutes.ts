import { Router } from 'express';
import { registrar, login, verifyToken, getAllUsuarios } from '../controllers/usuariosController';
import { verificarToken } from '../middlewares/verificarToken';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Endpoints para la gestión y autenticación de usuarios
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
 *     Usuario:
 *       type: object
 *       properties:
 *         id_usuario:
 *           type: integer
 *           example: 1
 *         id_rol:
 *           type: integer
 *           example: 2
 *         nombre:
 *           type: string
 *           example: "Gonzalo"
 *         apellido:
 *           type: string
 *           example: "Lima"
 *         dni:
 *           type: string
 *           example: "40123456"
 *         email:
 *           type: string
 *           example: "gonzalo@example.com"
 *         contrasena:
 *           type: string
 *           example: "123456"
 */

/**
 * @swagger
 * /api/usuarios/registrar:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - apellido
 *               - dni
 *               - email
 *               - contrasena
 *               - id_rol
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Juan"
 *               apellido:
 *                 type: string
 *                 example: "Pérez"
 *               dni:
 *                 type: string
 *                 example: "40123456"
 *               email:
 *                 type: string
 *                 example: "juanperez@example.com"
 *               contrasena:
 *                 type: string
 *                 example: "123456"
 *               id_rol:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Usuario registrado correctamente
 *       400:
 *         description: Error al registrar el usuario
 */

/**
 * @swagger
 * /api/usuarios/login:
 *   post:
 *     summary: Iniciar sesión y obtener un token JWT
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - contrasena
 *             properties:
 *               email:
 *                 type: string
 *                 example: "juanperez@example.com"
 *               contrasena:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso, devuelve el token JWT
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
 *       401:
 *         description: Credenciales inválidas
 */

/**
 * @swagger
 * /api/usuarios/verificar:
 *   get:
 *     summary: Verifica la validez del token JWT
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Token válido
 *       401:
 *         description: Token inválido o expirado
 */

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Obtener todos los usuarios (requiere autenticación)
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error al obtener los usuarios
 */

router.post('/registrar', registrar);
router.post('/login', login);
router.get('/verificar', verifyToken);
router.get('/', getAllUsuarios);

export default router;
