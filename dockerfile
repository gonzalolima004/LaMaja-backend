# === STAGE 1: Build (para compilar TypeScript) ===
FROM node:20 AS builder

WORKDIR /app

# Copia solo los archivos necesarios para instalar dependencias y compilar
COPY package*.json ./
RUN npm install

# Copia el resto del código fuente
COPY . .

# Ejecuta el comando de compilación de TypeScript y Prisma
RUN npm run build
RUN npx prisma generate

# EXPOSE 4000 (Opcional en Render, pero buena práctica)
# EXPOSE 4000

# === STAGE 2: Production (Imagen final ligera) ===
FROM node:20-slim

WORKDIR /app

# Copia solo las dependencias de producción y el código compilado (dist)
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist 
COPY --from=builder /app/prisma ./prisma

# Render siempre usará la variable PORT
ENV PORT=4000 

# El comando final para iniciar el servidor
CMD ["node", "dist/index.js"]