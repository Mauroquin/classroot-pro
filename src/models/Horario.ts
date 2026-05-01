import { DataTypes, Model, InferAttributes, InferCreationAttributes } from 'sequelize';
import db from '../config/database';

class Horario extends Model<InferAttributes<Horario>, InferCreationAttributes<Horario>> {
  declare id?: number;
  declare dia: number;
  declare horaInicio: string;
  declare horaFin: string;
  declare materia: string;
  declare profesor: string;
  declare color?: string;
}

Horario.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  dia: { type: DataTypes.INTEGER, allowNull: false },
  horaInicio: { type: DataTypes.STRING, allowNull: false },
  horaFin: { type: DataTypes.STRING, allowNull: false },
  materia: { type: DataTypes.STRING, allowNull: false },
  profesor: { type: DataTypes.STRING, allowNull: false },
  color: { type: DataTypes.STRING }
}, { tableName: 'horarios', timestamps: false, sequelize: db });

export default Horario;