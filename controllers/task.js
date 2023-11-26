import { Task } from "../models/task.js";

// Function: Create new task
export const newTask = async(req, res, next) => {

    const {title, description} = req.body;

    await Task.create({
        title,
        description,
        user: req.user,
    });

    res.status(201).json({
        status: true,
        message: "Task created successfully",
    });
};