"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database")); // Importamos la conexión, NO al modelo
// 1. Definimos la clase (aquí NO debe haber imports de 'Usuario')
class Usuario extends sequelize_1.Model {
}
// 2. Inicializamos la tabla
Usuario.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    full_name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    password_hash: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    role: {
        type: sequelize_1.DataTypes.ENUM('profesor', 'alumno', 'delegado'),
        allowNull: false,
    },
}, {
    sequelize: database_1.default,
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
});
// 3. Exportamos el modelo para que otros archivos lo usen
exports.default = Usuario;
