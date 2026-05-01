"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = seed;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("./config/database"));
async function seed() {
    try {
        console.log('🌱 Checking database...');
        await database_1.default.authenticate();
        console.log('✅ MySQL connected');
        const Usuario = database_1.default.define('Usuario', {
            nombre: { type: sequelize_1.DataTypes.STRING, allowNull: false },
            email: { type: sequelize_1.DataTypes.STRING, allowNull: false, unique: true },
            password: { type: sequelize_1.DataTypes.STRING, allowNull: false },
            rol: { type: sequelize_1.DataTypes.STRING, allowNull: false }
        }, { tableName: 'usuarios', timestamps: false });
        const Tarea = database_1.default.define('Tarea', {
            titulo: { type: sequelize_1.DataTypes.STRING, allowNull: false },
            descripcion: { type: sequelize_1.DataTypes.TEXT },
            fecha_entrega: { type: sequelize_1.DataTypes.DATE, allowNull: false },
            materia_id: { type: sequelize_1.DataTypes.INTEGER }
        }, { tableName: 'tareas', timestamps: false });
        const Horario = database_1.default.define('Horario', {
            dia: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
            horaInicio: { type: sequelize_1.DataTypes.STRING, allowNull: false },
            horaFin: { type: sequelize_1.DataTypes.STRING, allowNull: false },
            materia: { type: sequelize_1.DataTypes.STRING, allowNull: false },
            profesor: { type: sequelize_1.DataTypes.STRING, allowNull: false },
            color: { type: sequelize_1.DataTypes.STRING }
        }, { tableName: 'horarios', timestamps: false });
        await database_1.default.sync();
        await Usuario.sync();
        await Tarea.sync();
        await Horario.sync();
        const usuariosCount = await Usuario.count();
        const tareasCount = await Tarea.count();
        const clasesCount = await Horario.count();
        if (usuariosCount === 0) {
            console.log('📝 Seeding usuarios...');
            await Usuario.bulkCreate([
                { nombre: 'Profe Ana', email: 'profesor@clase.com', password: '123456', rol: 'profesor' },
                { nombre: 'Carlos M.', email: 'carlos@clase.com', password: '123456', rol: 'alumno' },
                { nombre: 'Maria L.', email: 'maria@clase.com', password: '123456', rol: 'alumno' }
            ]);
        }
        if (tareasCount === 0) {
            console.log('📝 Seeding tareas...');
            const fecha1 = new Date();
            fecha1.setDate(fecha1.getDate() + 3);
            const fecha2 = new Date();
            fecha2.setDate(fecha2.getDate() + 7);
            await Tarea.bulkCreate([
                { titulo: 'Taller de Redes', descripcion: 'Configurar red LAN', fecha_entrega: fecha1, materia_id: 1 },
                { titulo: 'Página Web HTML', descripcion: 'Crear página personal', fecha_entrega: fecha2, materia_id: 1 },
                { titulo: 'Ejercicios de Matemáticas', descripcion: 'Páginas 45-50', fecha_entrega: fecha1, materia_id: 2 },
                { titulo: 'Ensayo de Historia', descripcion: 'Sobre la independencia', fecha_entrega: fecha2, materia_id: 3 }
            ]);
        }
        if (clasesCount === 0) {
            console.log('📝 Seeding horario...');
            await Horario.bulkCreate([
                { dia: 1, horaInicio: '07:30', horaFin: '08:20', materia: 'Informática', profesor: 'Profe Ana', color: '#4f46e5' },
                { dia: 1, horaInicio: '08:20', horaFin: '09:10', materia: 'Matemáticas', profesor: 'Profe Luis', color: '#10b981' },
                { dia: 1, horaInicio: '09:10', horaFin: '10:00', materia: 'Lenguaje', profesor: 'Profe María', color: '#f59e0b' },
                { dia: 2, horaInicio: '07:30', horaFin: '08:20', materia: 'Historia', profesor: 'Profe José', color: '#ef4444' },
                { dia: 2, horaInicio: '08:20', horaFin: '09:10', materia: 'Informática', profesor: 'Profe Ana', color: '#4f46e5' },
                { dia: 2, horaInicio: '09:10', horaFin: '10:00', materia: 'Ciencias', profesor: 'Profe Laura', color: '#8b5cf6' },
                { dia: 3, horaInicio: '07:30', horaFin: '08:20', materia: 'Matemáticas', profesor: 'Profe Luis', color: '#10b981' },
                { dia: 3, horaInicio: '08:20', horaFin: '09:10', materia: 'Informática', profesor: 'Profe Ana', color: '#4f46e5' },
                { dia: 3, horaInicio: '09:10', horaFin: '10:00', materia: 'Educ. Física', profesor: 'Profe Pedro', color: '#06b6d4' },
                { dia: 4, horaInicio: '07:30', horaFin: '08:20', materia: 'Lenguaje', profesor: 'Profe María', color: '#f59e0b' },
                { dia: 4, horaInicio: '08:20', horaFin: '09:10', materia: 'Informática', profesor: 'Profe Ana', color: '#4f46e5' },
                { dia: 4, horaInicio: '09:10', horaFin: '10:00', materia: 'Historia', profesor: 'Profe José', color: '#ef4444' },
                { dia: 5, horaInicio: '07:30', horaFin: '08:20', materia: 'Ciencias', profesor: 'Profe Laura', color: '#8b5cf6' },
                { dia: 5, horaInicio: '08:20', horaFin: '09:10', materia: 'Matemáticas', profesor: 'Profe Luis', color: '#10b981' },
                { dia: 5, horaInicio: '09:10', horaFin: '10:00', materia: 'Informática', profesor: 'Profe Ana', color: '#4f46e5' },
                { dia: 6, horaInicio: '07:30', horaFin: '08:20', materia: 'Arte', profesor: 'Profe Carmen', color: '#ec4899' },
                { dia: 6, horaInicio: '08:20', horaFin: '09:10', materia: 'Música', profesor: 'Profe Diego', color: '#14b8a6' }
            ]);
        }
        console.log(`✅ Listo: ${usuariosCount} usuarios, ${tareasCount} tareas, ${clasesCount} clases`);
        return true;
    }
    catch (err) {
        console.error('❌Seed error:', err.message);
        return false;
    }
}
