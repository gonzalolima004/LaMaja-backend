import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentada con Swagger',
      version: '1.0.0',
      description: 'Documentación de mi API construida en Node.js + TypeScript',
    },
    servers: [
      {
        url: 'https://lamaja-backend.onrender.com',
        description: 'Servidor montado en Render.com',
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export function swaggerDocs(app: Express, port: number) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
