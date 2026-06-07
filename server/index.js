import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser"; 
import connectDB from "./utils/database.js";
import authRouter from "./routes/auth.routes.js";

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Backend Running");
});

app.use("/api/auth", authRouter);

connectDB();

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});