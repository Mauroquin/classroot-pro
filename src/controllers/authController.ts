import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario';

const JWT_SECRET = 'Clave_Informatica_6to_Semestre';

export const registrarUsuario = async (req: Request, res: Response) => {
    try {
        const { full_name, email, password, role } = req.body;
        const password_hash = await bcrypt.hash(password, 10);
        const nuevo = await Usuario.create({ full_name, email, password_hash, role });
        res.status(201).json({ msg: 'Usuario Creado', id: nuevo.id });
    } catch (e) { res.status(500).json({ msg: 'Error al registrar' }); }
};

export const loginUsuario = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) return res.status(404).json({ msg: 'No existe el usuario' });

        const valida = await bcrypt.compare(password, usuario.password_hash);
        if (!valida) return res.status(401).json({ msg: 'Contraseña incorrecta' });

        const token = jwt.sign({ id: usuario.id, role: usuario.role }, JWT_SECRET, { expiresIn: '4h' });
        res.json({ token, usuario: { nombre: usuario.full_name, rol: usuario.role } });
    } catch (e) { res.status(500).json({ msg: 'Error en login' }); }
};
