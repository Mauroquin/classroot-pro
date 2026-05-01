import { Request, Response } from 'express';
import db from '../config/database';

export const subirEntrega = async (req: any, res: Response) => {
    try {
        // req.file contiene la información del archivo subido por Multer
        if (!req.file) {
            return res.status(400).json({ msg: 'Por favor, selecciona un archivo PDF' });
        }

        const { assignment_id } = req.body;
        const student_id = req.user.id; // Obtenido del Token por el middleware
        const file_path = req.file.path; // Ruta del archivo en el servidor

        // Insertar en la tabla 'submissions' que creamos en SQL
        await db.query(
            'INSERT INTO submissions (assignment_id, student_id, file_path) VALUES (?, ?, ?)',
            { replacements: [assignment_id, student_id, file_path] }
        );

        res.json({ msg: '✅ Tarea entregada correctamente', archivo: req.file.filename });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al procesar la entrega' });
    }
};
export const obtenerEntregas = async (req: Request, res: Response) => {
    try {
        // Hacemos un JOIN para saber el nombre del alumno y el título de la tarea
        const [entregas] = await db.query(`
            SELECT s.id, u.full_name as alumno, a.title as tarea, s.file_path, s.submitted_at
            FROM submissions s
            JOIN users u ON s.student_id = u.id
            JOIN assignments a ON s.assignment_id = a.id
        `);
        res.json(entregas);
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener entregas' });
    }
};
