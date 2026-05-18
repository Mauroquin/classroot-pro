"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Usuario extends sequelize_1.Model {
}
Usuario.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    full_name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
        field: 'nombre', // Mapea a la columna real 'nombre'
    },
    email: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        field: 'email',
    },
    password_hash: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
        field: 'password', // Mapea a la columna real 'password'
    },
    role: {
        type: sequelize_1.DataTypes.ENUM('profesor', 'alumno', 'delegado'),
        allowNull: false,
        field: 'rol', // Mapea a la columna real 'rol'
    },
}, {
    sequelize: database_1.default,
    tableName: 'usuarios', // Tu tabla física real en MySQL
    timestamps: false, // <--- DESACTIVADO: Tu tabla no tiene columnas de fecha
});
exports.default = Usuario;
