"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = exports.conectarDB = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Configura los datos que pusimos en el Paso 1
const db = new sequelize_1.Sequelize(process.env.DB_NAME || 'classroom_db', process.env.DB_USER || 'estudiante', process.env.DB_PASSWORD || 'TuPasswordSeguro', {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false,
    port: Number(process.env.DB_PORT) || 3306
});
exports.sequelize = db;
const conectarDB = async () => {
    try {
        await db.authenticate();
        console.log('✅ MySQL conectado');
    }
    catch (error) {
        console.error('❌ Error conectando a MySQL:', error);
    }
};
exports.conectarDB = conectarDB;
exports.default = db; // <--- Añade esto al final
