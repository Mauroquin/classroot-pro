import { Router } from 'express';
import { crearTarea, obtenerTareas } from '../controllers/tareasController';
import { verificarToken, esProfesor } from '../middleware/authMiddleware';
import multer from 'multer';
import { subirEntrega } from '../controllers/entregaController';
import { obtenerEntregas } from '../controllers/entregaController';

const router = Router();

// Cualquier usuario logueado puede ver las tareas
router.get('/todas', verificarToken, obtenerTareas);

// SOLO los profesores pueden crear tareas
router.post('/crear', verificarToken, esProfesor, crearTarea);

// Configuración de Multer: Guardar en 'uploads' con nombre original
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

// Añadir a las rutas existentes
router.post('/entregar', verificarToken, upload.single('archivo'), subirEntrega);
router.get('/ver-entregas', verificarToken, esProfesor, obtenerEntregas);

export default router;

