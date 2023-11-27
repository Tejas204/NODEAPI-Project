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

// Function: Get all tasks of logged in user
export const getAllTasks = async(req, res, next) => {

    const userId = req.user._id;

    const allTasks = await Task.find({user: userId});

    res.status(200).json({
        status: true,
        tasks: allTasks
    });
}

// Function: Update task
export const updateIsCompleted = async (req, res, next) => {

    const {id} = req.params;

    const task = await Task.findById(id);

    if(!task) return res.status(404).json({
        status: false,
        message: "Invalid task id"
    })
    
    task.isCompleted = !task.isCompleted;

    await task.save();

    res.status(200).json({
        status: true,
        message: "Task updated",
    });
};

// Function: Delete task
export const deleteTask = async(req, res, next) => {

    const {id} = req.params;

    const task = await Task.findById(id);

    if(!task) return res.status(404).json({
        status: false,
        message: "Invalid task id"
    })

    await task.deleteOne();


    res.status(200).json({
        status: true,
        message: "Task Deleted"
    })
}