"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.esProfesor = exports.verificarToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = 'Clave_Informatica_6to_Semestre';
// Middleware para verificar que el usuario está logueado
const verificarToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token)
        return res.status(401).json({ msg: 'Acceso denegado: No hay token' });
    try {
        const cifrado = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.user = cifrado; // Guardamos los datos del usuario (id, rol) en la petición
        next();
    }
    catch (error) {
        res.status(403).json({ msg: 'Token no válido o expirado' });
    }
};
exports.verificarToken = verificarToken;
// Middleware para verificar si es PROFESOR
const esProfesor = (req, res, next) => {
    if (req.user && req.user.role === 'profesor') {
        next();
    }
    else {
        res.status(403).json({ msg: 'Permiso denegado: Solo profesores pueden hacer esto' });
    }
};
exports.esProfesor = esProfesor;
