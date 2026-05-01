import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Configura los datos que pusimos en el Paso 1
const db = new Sequelize(
    process.env.DB_NAME || 'classroom_db',
    process.env.DB_USER || 'estudiante',
    process.env.DB_PASSWORD || 'TuPasswordSeguro',
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql',
        logging: false,
        port: Number(process.env.DB_PORT) || 3306
    }
);

export const conectarDB = async () => {
    try {
        await db.authenticate();
        console.log('✅ MySQL conectado');
    } catch (error) {
        console.error('❌ Error conectando a MySQL:', error);
    }
};

export { db as sequelize };
export default db; // <--- Añade esto al final
