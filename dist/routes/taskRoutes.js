"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// Cambia "auth" por "verificarToken"
router.get('/tareas', authMiddleware_1.verificarToken, (req, res) => { });
// Cambia "auth" por "verificarToken" y "esProfesorODelgado" por "esProfesor"
router.post('/tareas', authMiddleware_1.verificarToken, authMiddleware_1.esProfesor, (req, res) => { });
exports.default = router;
