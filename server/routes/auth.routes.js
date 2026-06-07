import express from "express";
import {
  googleAuth,
  Authlogout,
} from "../controllers/auth.controllers.js";

const authRouter = express.Router();

authRouter.post("/google", googleAuth);

authRouter.get("/logout", Authlogout);

export default authRouter;