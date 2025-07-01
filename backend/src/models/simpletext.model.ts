import { sq } from '../config/db';
import { DataType, DataTypes } from 'sequelize';

const simpleTextModel = sq.define('simpletext', {
  itemKey: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.STRING,
  },
  data: {
    type: DataTypes.TEXT,
  },
});

simpleTextModel.sync().then(() => {
  console.log('Simple text model created');
});

export default simpleTextModel;
