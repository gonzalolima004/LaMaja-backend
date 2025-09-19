import express from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import usuarioRoutes from './routes/usuarioRoutes'; 

dotenv.config();

export const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(cors());

// Rutas
app.use("/api/usuarios", usuarioRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend corriendo en puerto ${PORT}`));
