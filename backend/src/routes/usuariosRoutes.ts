import { Router } from 'express';
import { registrar, login, verifyToken, getAllUsuarios } from '../controllers/usuariosController';
import { verificarToken } from '../middlewares/verificarToken';

const router = Router();

router.post('/registrar', registrar);
router.post('/login', login);
router.get('/verificar', verifyToken);
router.get('/', getAllUsuarios);

export default router;

    