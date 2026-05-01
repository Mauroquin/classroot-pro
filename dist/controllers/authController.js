"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUsuario = exports.registrarUsuario = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Usuario_1 = __importDefault(require("../models/Usuario"));
const JWT_SECRET = 'Clave_Informatica_6to_Semestre';
const registrarUsuario = async (req, res) => {
    try {
        const { full_name, email, password, role } = req.body;
        const password_hash = await bcrypt_1.default.hash(password, 10);
        const nuevo = await Usuario_1.default.create({ full_name, email, password_hash, role });
        res.status(201).json({ msg: 'Usuario Creado', id: nuevo.id });
    }
    catch (e) {
        res.status(500).json({ msg: 'Error al registrar' });
    }
};
exports.registrarUsuario = registrarUsuario;
const loginUsuario = async (req, res) => {
    try {
        const { email, password } = req.body;
        const usuario = await Usuario_1.default.findOne({ where: { email } });
        if (!usuario)
            return res.status(404).json({ msg: 'No existe el usuario' });
        const valida = await bcrypt_1.default.compare(password, usuario.password_hash);
        if (!valida)
            return res.status(401).json({ msg: 'Contraseña incorrecta' });
        const token = jsonwebtoken_1.default.sign({ id: usuario.id, role: usuario.role }, JWT_SECRET, { expiresIn: '4h' });
        res.json({ token, usuario: { nombre: usuario.full_name, rol: usuario.role } });
    }
    catch (e) {
        res.status(500).json({ msg: 'Error en login' });
    }
};
exports.loginUsuario = loginUsuario;
