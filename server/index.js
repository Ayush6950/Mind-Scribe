import express from 'express';
import dotenv from 'dotenv';
import connectDB from './utils/database.js';
const app = express();
dotenv.config();


const port = process.env.PORT||5000;


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(` app listening on port ${port}`);
  connectDB();
});