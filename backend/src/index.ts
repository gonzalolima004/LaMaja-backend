import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';


export const prisma = new PrismaClient();

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend corriendo en puerto ${PORT}`));