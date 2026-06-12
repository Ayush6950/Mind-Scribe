import isAuth from "../middleware/isAuth";
import express from "express"
import { getCurrentUser } from "../controllers/user.controllers";

const userRouter = express.Router()

userRouter.get("/currentuser", isAuth,getCurrentUser);

export default userRouter;  