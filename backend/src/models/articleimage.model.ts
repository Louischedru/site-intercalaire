import { DataTypes } from 'sequelize';
import { sq } from '../config/db';

const articleimageModel = sq.define('articleimage', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  path: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  alt: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

articleimageModel.sync().then(() => {
  console.log('article image model created');
});

export default articleimageModel;
