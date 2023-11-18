import { User } from "../models/user.js";

// Function: get all users
export const getAllUsers = async (req, res) => {

    const users = await User.find({});
    console.log(req.query)

    res.json({
        success: true,
        users,
    });
};

// Function: create new user
export const createNewUser = async (req, res) => {

    const{name, email, password} = req.body;

    await User.create({
        name,
        email,
        password
    });

    // Status 201: Created
    res.status(201).json({
        success: true,
        message: "Registered successfully",
    });
};

// Function: delete an user
export const deleteUser = async (req, res)=>{

    const {userid} = req.body;

    await User.deleteOne({
        userid,
    });

    res.status(200).json({
        success: true,
        message: "Deletion successful"
    })
};

// Function: get user by user id dynamically
export const getUserbyUserId = async(req, res)=>{
    const {id} = req.params;
    const user = await User.findById(id);
    
    res.json({
        success: true,
        user
    })
};