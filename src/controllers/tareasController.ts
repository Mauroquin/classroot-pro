import { Request, Response } from 'express';
import Tarea from '../models/Tarea';

export const crearTarea = async (req: Request, res: Response) => {
    try {
        // Extraemos los datos del body (vienen del fetch del frontend)
        const { titulo, descripcion, fecha_entrega, materia_id } = req.body;

        const nuevaTarea = await Tarea.create({
            titulo,
            descripcion,
            fecha_entrega, // Asegúrate que el frontend envíe 'fecha_entrega'
            materia_id
        });

        res.status(201).json(nuevaTarea);
    } catch (error) {
        console.error("ERROR EN DB:", error); // Mira tu terminal de WSL para ver el error real
        res.status(500).json({ msg: 'Error al insertar en la base de datos' });
    }
};


export const obtenerTareas = async (_req: Request, res: Response) => {
    try {
        const tareas = await Tarea.findAll({
            order: [['fecha_entrega', 'ASC']]
        });
        res.json(tareas);
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener las tareas' });
    }
};
