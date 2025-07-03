import { DataTypes } from 'sequelize';
import { sq } from '../config/db';

const shortinfoModel = sq.define('shortinfo', {
  itemKey: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.STRING,
  },
  data: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

shortinfoModel.sync().then(() => {
  console.log('Short info model created');
});

export default shortinfoModel;
