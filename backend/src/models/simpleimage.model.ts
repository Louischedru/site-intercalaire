import { DataTypes } from 'sequelize';
import { sq } from '../config/db';

const simpleImageModel = sq.define('simpleimage', {
  itemKey: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  path: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

simpleImageModel.sync().then(() => {
  console.log('Simple image model created');
});

export default simpleImageModel;
