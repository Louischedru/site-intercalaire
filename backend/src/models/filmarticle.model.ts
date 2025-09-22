import { DataTypes } from 'sequelize';
import { sq } from '../config/db';

const filmarticleModel = sq.define('filmarticle', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  poster: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  desc: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  info: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  synopsis: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  article: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  incoming: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  published: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  images: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

filmarticleModel.sync().then(() => {
  console.log('Film article model created');
});

export default filmarticleModel;
