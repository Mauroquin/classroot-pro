"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerTareas = exports.crearTarea = void 0;
const Tarea_1 = __importDefault(require("../models/Tarea"));
const crearTarea = async (req, res) => {
    try {
        // Extraemos los datos del body (vienen del fetch del frontend)
        const { titulo, descripcion, fecha_entrega, materia_id } = req.body;
        const nuevaTarea = await Tarea_1.default.create({
            titulo,
            descripcion,
            fecha_entrega, // Asegúrate que el frontend envíe 'fecha_entrega'
            materia_id
        });
        res.status(201).json(nuevaTarea);
    }
    catch (error) {
        console.error("ERROR EN DB:", error); // Mira tu terminal de WSL para ver el error real
        res.status(500).json({ msg: 'Error al insertar en la base de datos' });
    }
};
exports.crearTarea = crearTarea;
const obtenerTareas = async (_req, res) => {
    try {
        const tareas = await Tarea_1.default.findAll({
            order: [['fecha_entrega', 'ASC']]
        });
        res.json(tareas);
    }
    catch (error) {
        res.status(500).json({ msg: 'Error al obtener las tareas' });
    }
};
exports.obtenerTareas = obtenerTareas;
