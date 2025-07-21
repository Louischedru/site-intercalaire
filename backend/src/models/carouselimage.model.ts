import { DataTypes } from 'sequelize';
import { sq } from '../config/db';

const carouselImageModel = sq.define('carouselimage', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: true,
  },
  carouselId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  path: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  desc: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  alt: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  textColor: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

carouselImageModel.sync().then(() => {
  console.log('Carousel image model created');
});

export default carouselImageModel;
