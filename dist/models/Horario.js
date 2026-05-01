"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Horario extends sequelize_1.Model {
}
Horario.init({
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    dia: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    horaInicio: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    horaFin: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    materia: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    profesor: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    color: { type: sequelize_1.DataTypes.STRING }
}, { tableName: 'horarios', timestamps: false, sequelize: database_1.default });
exports.default = Horario;
