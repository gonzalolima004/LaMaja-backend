import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import { swaggerDocs } from './swagger/swagger.config';


const app = express();
app.use(express.json());
app.use(cors({
  origin: '*',
}));

// ---- RUTAS ----
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

import detalle_presupuestoRoutes from './routes/detalle_presupuestoRoutes';
app.use('/api/detalles_presupuesto', detalle_presupuestoRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend corriendo en puerto ${PORT}`);
  swaggerDocs(app, Number(PORT));
});
