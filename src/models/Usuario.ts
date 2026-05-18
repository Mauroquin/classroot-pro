import { DataTypes, Model } from 'sequelize';
import db from '../config/database'; 

class Usuario extends Model {
  public id!: number;
  public full_name!: string;
  public email!: string;
  public password_hash!: string;
  public role!: 'profesor' | 'alumno' | 'delegado';
}

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
      field: 'nombre', // Mapea a la columna real 'nombre'
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      field: 'email',
    },
    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'password', // Mapea a la columna real 'password'
    },
    role: {
      type: DataTypes.ENUM('profesor', 'alumno', 'delegado'),
      allowNull: false,
      field: 'rol', // Mapea a la columna real 'rol'
    },
  },
  {
    sequelize: db,
    tableName: 'usuarios', // Tu tabla física real en MySQL
    timestamps: false,     // <--- DESACTIVADO: Tu tabla no tiene columnas de fecha
  }
);

export default Usuario;
