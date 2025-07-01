import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const dbUrl = process.env.DATABASE_URL || 'not found';

export const sq = new Sequelize(dbUrl);

export const connectToDB = async () => {
  await sq
    .authenticate()
    .then(() => {
      console.log('Successfuly connected to database');
    })
    .catch(err => {
      console.log(err);
    });
};
