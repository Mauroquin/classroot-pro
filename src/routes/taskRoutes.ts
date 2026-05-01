import { Router } from 'express';
import { verificarToken, esProfesor } from '../middleware/authMiddleware';

const router = Router();

// Cambia "auth" por "verificarToken"
router.get('/tareas', verificarToken, (req, res) => { /* ... lógica ... */ });

// Cambia "auth" por "verificarToken" y "esProfesorODelgado" por "esProfesor"
router.post('/tareas', verificarToken, esProfesor, (req, res) => { /* ... lógica ... */ });

export default router;
