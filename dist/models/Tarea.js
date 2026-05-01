"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Tarea extends sequelize_1.Model {
}
Tarea.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    titulo: {
        type: sequelize_1.DataTypes.STRING,
        field: 'title', // <--- ESTO mapea 'titulo' con la columna 'title' de MySQL
        allowNull: false
    },
    descripcion: {
        type: sequelize_1.DataTypes.TEXT,
        field: 'description' // <--- Mapea con 'description'
    },
    fecha_entrega: {
        type: sequelize_1.DataTypes.DATE,
        field: 'due_date', // <--- Mapea con 'due_date'
        allowNull: false
    },
    materia_id: {
        type: sequelize_1.DataTypes.INTEGER,
        field: 'course_id', // <--- Mapea con 'course_id'
        allowNull: true
    }
}, {
    sequelize: database_1.default,
    tableName: 'assignments',
    timestamps: false
});
exports.default = Tarea;
