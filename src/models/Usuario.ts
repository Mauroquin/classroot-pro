import { DataTypes, Model } from 'sequelize';
import db from '../config/database'; // Importamos la conexión, NO al modelo

// 1. Definimos la clase (aquí NO debe haber imports de 'Usuario')
class Usuario extends Model {
  public id!: number;
  public full_name!: string;
  public email!: string;
  public password_hash!: string;
  public role!: 'profesor' | 'alumno' | 'delegado';
}

// 2. Inicializamos la tabla
Usuario.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    full_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('profesor', 'alumno', 'delegado'),
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
  }
);

// 3. Exportamos el modelo para que otros archivos lo usen
export default Usuario;
