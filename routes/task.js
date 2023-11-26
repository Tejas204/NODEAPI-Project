import express from "express";
import { newTask, getAllTasks } from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";

const taskRouter = express.Router();

// API: Create new task
taskRouter.post("/new", isAuthenticated, newTask);

// API: Get all tasks of logged in user
taskRouter.get("/getMyTasks", isAuthenticated, getAllTasks);

export default taskRouter;