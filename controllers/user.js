import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import bcrypt from "bcrypt";

// Function: Get all users
export const getAllUsers = async (req, res) => {

    const users = await User.find({});
    console.log(req.query)

    res.json({
        success: true,
        users,
    });
};

// Function: Register new user
export const register = async (req, res) => {
    const {name, email, password} = req.body;

    let user = await User.findOne({email});

    if(user){
        return res.status(404).json({
            success: false,
            message: "User already exists",
        });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);

    res.status(201).cookie("token", token, {
        httpOnly: true,
        maxAge: 15*60*1000,
    }).json({
        success: true,
        message: "Registered Successfully",
    });
};

// Function: Login functionality
export const login = async(req, res) => {

}

// Function: delete an user
export const deleteUser = async (req, res)=>{
    const {id} = req.params;

    // await User.remove({
    //     id,
    // });

    res.status(200).json({
        success: true,
        message: "Deletion successful"
    })
};

// Function: get user by user id dynamically

// API: Get user id dynamically
// /userid is static, :id makes it dynamic

/* Explanation 
* Ex query: localhost:4000/user?name=Tejas&id=10
* req.params will return 'user'
* req.query will return the following 
{
    name: 'Tejas',
    id: '10'
}
*/
export const getUserbyUserId = async(req, res)=>{
    const {id} = req.params;
    const user = await User.findById(id);
    
    res.json({
        success: true,
        user
    })
};

// Function: update user
export const updateUser = async(req, res)=>{
    const {id} = req.params;
    const user = await User.findById(id);
    
    res.json({
        success: true,
        message: "Updated"
    })
};