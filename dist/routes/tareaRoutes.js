"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tareasController_1 = require("../controllers/tareasController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const multer_1 = __importDefault(require("multer"));
const entregaController_1 = require("../controllers/entregaController");
const entregaController_2 = require("../controllers/entregaController");
const router = (0, express_1.Router)();
// Cualquier usuario logueado puede ver las tareas
router.get('/todas', authMiddleware_1.verificarToken, tareasController_1.obtenerTareas);
// SOLO los profesores pueden crear tareas
router.post('/crear', authMiddleware_1.verificarToken, authMiddleware_1.esProfesor, tareasController_1.crearTarea);
// Configuración de Multer: Guardar en 'uploads' con nombre original
const storage = multer_1.default.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = (0, multer_1.default)({ storage });
// Añadir a las rutas existentes
router.post('/entregar', authMiddleware_1.verificarToken, upload.single('archivo'), entregaController_1.subirEntrega);
router.get('/ver-entregas', authMiddleware_1.verificarToken, authMiddleware_1.esProfesor, entregaController_2.obtenerEntregas);
exports.default = router;
