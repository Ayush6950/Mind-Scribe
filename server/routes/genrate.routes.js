import express from "express";
import { generateNotes } from "../controllers/generate.controllers.js";
import isAuth from "../middleware/isAuth.js";


const notesRouter = express.Router();

notesRouter.post("/genrate-notes",isAuth,generateNotes)

export default notesRouter;