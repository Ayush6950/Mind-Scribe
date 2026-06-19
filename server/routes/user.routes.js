import isAuth from "../middleware/isAuth.js";
import express from "express"
import { getCurrentUser } from "../controllers/user.controllers.js";

const userRouter = express.Router()

userRouter.get("/currentuser", isAuth,getCurrentUser);

export default userRouter;  