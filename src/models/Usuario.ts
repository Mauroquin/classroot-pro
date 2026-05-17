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
      field: 'nombre', // <--- MAPEA A LA COLUMNA 'nombre' EN MYSQL
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
      field: 'password', // <--- MAPEA A LA COLUMNA 'password' EN MYSQL
    },
    role: {
      type: DataTypes.ENUM('profesor', 'alumno', 'delegado'),
      allowNull: false,
      field: 'rol', // <--- MAPEA A LA COLUMNA 'rol' EN MYSQL
    },
  },
  {
    sequelize: db,
    tableName: 'usuarios', // <--- NOMBRE REAL DE TU TABLA EN MYSQL
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
  }
);

export default Usuario;
