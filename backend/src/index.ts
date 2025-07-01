import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectToDB } from './config/db';
import apiRouter from './routers/api.router';
import path = require('path');

dotenv.config();

connectToDB();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.raw());
app.use(
  // cors({
  //   origin: process.env.CLIENT_URL,
  //   credentials: true,
  // }),
  cors(),
);

app.use('/api', apiRouter);
app.use('/files', express.static(path.join(__dirname, '../files')));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
