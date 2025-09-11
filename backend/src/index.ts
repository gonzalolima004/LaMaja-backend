import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';


export const prisma = new PrismaClient();

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

import authRoutes from './routes/usuariosRoutes';
app.use('/api/usuarios', authRoutes);

import clientesRoutes from './routes/clientesRoutes';
app.use('/api/clientes', clientesRoutes);

import animalesRoutes from './routes/animalesRoutes';
app.use('/api/animales', animalesRoutes);

import procedimientoVeterinarioRoutes from './routes/procedimiento_veterinarioRoutes';
app.use('/api/procedimientos', procedimientoVeterinarioRoutes);

import cobrosRoutes from './routes/cobrosRoutes';
app.use('/api/cobros', cobrosRoutes);

import facturaVentaRoutes from './routes/factura_ventaRoutes';
app.use('/api/facturas_venta', facturaVentaRoutes);

import presupuestosRoutes from './routes/presupuestosRoutes';
app.use('/api/presupuestos', presupuestosRoutes);   

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend corriendo en puerto ${PORT}`));