import { generateNotes } from "../controllers/generate.controllers";
import isAuth from "../middleware/isAuth";


const notesRouter = express.Router();

notes.Router.post("/genrate-notes",isAuth,generateNotes)

export default notesRouter;