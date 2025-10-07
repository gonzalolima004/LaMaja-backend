import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secreto-super-seguro';

export function verificarToken(req: Request, res: Response, next: NextFunction)  {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ mensaje: 'Token no proporcionado' });
    
  } else {
    try {
      const payload = jwt.verify(token, JWT_SECRET);
      (req as any).usuario = payload;
      next();
    } catch (error) {
      res.status(403).json({ mensaje: 'Token inválido' });
     
    }

  }

 
}

