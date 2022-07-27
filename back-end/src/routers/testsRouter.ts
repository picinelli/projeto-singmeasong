import { Router } from "express";
import { deleteAllData } from "../controllers/testsController.js";

const testsRouter = Router();

testsRouter.delete("/recommendations/delete", deleteAllData);

export default testsRouter;
