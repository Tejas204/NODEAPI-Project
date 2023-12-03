import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";

// Function: Create new task
export const newTask = async(req, res, next) => {

    try {
        const {title, description} = req.body;

        await Task.create({
            title,
            description,
            user: req.user,
        });

        res.status(201).json({
            success: true,
            message: "Task created successfully",
        });
    } catch (error) {
        next(error);
    }
};

// Function: Get all tasks of logged in user
export const getAllTasks = async(req, res, next) => {

    try {
        const userId = req.user._id;

        const allTasks = await Task.find({user: userId});

        res.status(200).json({
            success: true,
            tasks: allTasks
        });
    } catch (error) {
        next(error);
    }
}

// Function: Update task
export const updateIsCompleted = async (req, res, next) => {

    try {
        const {id} = req.params;

        const task = await Task.findById(id);

        if(!task) return next(new ErrorHandler("Invalid Task ID", 404)); 
        
        task.isCompleted = !task.isCompleted;

        await task.save();

        res.status(200).json({
            success: true,
            message: "Task updated",
        });
    } catch (error) {
        next(error);
    }
};

// Function: Delete task
export const deleteTask = async(req, res, next) => {
    try {
        const {id} = req.params;

        const task = await Task.findById(id);
    
        if(!task) return next(new ErrorHandler("Invalid Task ID", 404)); 
    
        await task.deleteOne();
    
    
        res.status(200).json({
            success: true,
            message: "Task Deleted"
        });
    } catch (error) {
        next(error);
    }
}