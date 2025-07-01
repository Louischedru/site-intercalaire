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
  desc: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  list: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

imageDescModel.sync().then(() => {
  console.log('Image desc model createrd');
});

export default imageDescModel;
