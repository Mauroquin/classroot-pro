import { DataTypes, Model } from 'sequelize';
import db from '../config/database';

class Tarea extends Model {}

Tarea.init({
    id: { 
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
    },
    titulo: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    descripcion: { 
        type: DataTypes.TEXT
    },
    fecha_entrega: { 
        type: DataTypes.DATE, 
        allowNull: false 
    },
    materia_id: { 
        type: DataTypes.INTEGER, 
        allowNull: true 
    }
}, {
    sequelize: db,
    tableName: 'tareas', 
    timestamps: false,
    freezeTableName: true 
});

export default Tarea;
