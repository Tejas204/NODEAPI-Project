import express from "express";
import { User } from "../models/user.js";

const router = express.Router();

// API: Get all users from the database
router.get("/all", async (req, res) => {

    const users = await User.find({});
    console.log(req.query)

    res.json({
        success: true,
        users,
    });
});


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

// Dynamic route should ideally be placed at the end
router.get("/userid/:id", async(req, res)=>{
    const {id} = req.params;
    const user = await User.findById(id);
    
    res.json({
        success: true,
        user
    })
})



// API: delete an user
router.post("/delete", async (req, res)=>{

    const {userid} = req.body;

    await User.deleteOne({
        userid,
    });

    res.status(200).json({
        success: true,
        message: "Deletion successful"
    })
})

// API: Create new user
router.post("/new", async (req, res) => {

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
});

export default router;