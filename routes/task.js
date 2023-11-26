import express from "express";
import { newTask } from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";

const taskRouter = express.Router();

taskRouter.post("/new", isAuthenticated, newTask);

export default taskRouter;