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
        field: 'title', // <--- ESTO mapea 'titulo' con la columna 'title' de MySQL
        allowNull: false 
    },
    descripcion: { 
        type: DataTypes.TEXT,
        field: 'description' // <--- Mapea con 'description'
    },
    fecha_entrega: { 
        type: DataTypes.DATE, 
        field: 'due_date', // <--- Mapea con 'due_date'
        allowNull: false 
    },
    materia_id: { 
        type: DataTypes.INTEGER, 
        field: 'course_id', // <--- Mapea con 'course_id'
        allowNull: true 
    }
}, {
    sequelize: db,
    tableName: 'tareas', // <--- CAMBIA 'assignments' por 'tareas'
    timestamps: false,
    freezeTableName: true // <--- AÑADE ESTO para evitar traducciones automáticas
});

export default Tarea;
