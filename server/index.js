import express from 'express';
import dotenv from 'dotenv';
import connectDB from './utils/database.js';
import authRouter from '../server/routes/auth.routes.js'
import cookieParser from 'cookie-parser';
const app = express();
dotenv.config();


const port = process.env.PORT||5000;

app.use(express.json)
app.use(cokkie-cookieParser)
app.use(cors(
  {origin:"http://localhost:5173/",
     credentials:true,
     methods:["GET","POST","PUT","DELETE","OPTIONS"]
  }
))

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/auth',authRouter)
app.listen(port, () => {
  console.log(` app listening on port ${port}`);
  connectDB();
});