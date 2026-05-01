import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';


interface RecursoAttributes {
  id: number;
  titulo: string;
  url: string;
  tipo: 'drive' | 'notion' | 'pdf' | 'video';
  materia: string;
  descripcion?: string;
}

interface RecursoCreationAttributes extends Optional<RecursoAttributes, 'id'> {}

class Recurso extends Model<RecursoAttributes, RecursoCreationAttributes>
  implements RecursoAttributes {
  public id!: number;
  public titulo!: string;
  public url!: string;
  public tipo!: 'drive' | 'notion' | 'pdf' | 'video';
  public materia!: string;
  public descripcion?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Recurso.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tipo: {
    type: DataTypes.ENUM('drive', 'notion', 'pdf', 'video'),
    allowNull: false
  },
  materia: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  sequelize,
  tableName: 'recursos',
  timestamps: true
});

export default Recurso;