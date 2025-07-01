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
});

carouselImageModel.sync().then(() => {
  console.log('Carousel image model created');
});

export default carouselImageModel;
