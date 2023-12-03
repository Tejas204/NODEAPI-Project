import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookies } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

// Function: Get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        console.log(req.query)
    
        res.json({
            success: true,
            users,
        });
    } catch (error) {
        next(error);
    }
};

// Function: Register new user
export const register = async (req, res, next) => {
    try {
        const {name, email, password} = req.body;

        let user = await User.findOne({email});
    
        if(user) return next(new ErrorHandler("User already exists", 400)); 
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        user = await User.create({
            name,
            email,
            password: hashedPassword,
        });
    
        sendCookies(User, res, "Registered Successfully", 201);
    } catch (error) {
        next(error);
    }
};

// Function: Login functionality
export const login = async(req, res, next) => {
    try {
        const {email, password} = req.body;

        let user = await User.findOne({email}).select("+password");
    
        if(!user) return next(new ErrorHandler("Invalid Email or Password", 400)); 
    
        const isMatch = await bcrypt.compare(password, user.password);
    
        if(!isMatch) return next(new ErrorHandler("Invalid Email or Password", 400)); 
    
        sendCookies(user, res, `Welcome back, ${user.name}`, 200);
    } catch (error) {
        next(error);
    }
}

// Function: Get Logged in user profile
export const getMyProfile = (req, res)=>{

    res.status(200).json({
        success: true,
        user: req.user,
    });
};

// Function: logout
export const logout = async(req, res) => {
    res.status(200).cookie("token", "", {expires: new Date(Date.now())}).json({
        success: true,
        user: req.user,
    });
}


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

// Function: update user
export const updateUser = async(req, res)=>{
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        
        res.json({
            success: true,
            message: "Updated"
        });
    } catch (error) {
        next(error);
    }
};

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