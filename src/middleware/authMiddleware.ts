import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'Clave_Informatica_6to_Semestre';

// Middleware para verificar que el usuario está logueado
export const verificarToken = (req: any, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ msg: 'Acceso denegado: No hay token' });

    try {
        const cifrado = jwt.verify(token, JWT_SECRET);
        req.user = cifrado; // Guardamos los datos del usuario (id, rol) en la petición
        next();
    } catch (error) {
        res.status(403).json({ msg: 'Token no válido o expirado' });
    }
};

// Middleware para verificar si es PROFESOR
export const esProfesor = (req: any, res: Response, next: NextFunction) => {
    if (req.user && req.user.role === 'profesor') {
        next();
    } else {
        res.status(403).json({ msg: 'Permiso denegado: Solo profesores pueden hacer esto' });
    }
};
