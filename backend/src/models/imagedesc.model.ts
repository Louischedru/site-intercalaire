import { DataType, DataTypes } from 'sequelize';
import { sq } from '../config/db';

const imageDescModel = sq.define('imagedesc', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  path: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  desc: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  list: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  alt: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

imageDescModel.sync().then(() => {
  console.log('Image desc model createrd');
});

export default imageDescModel;
