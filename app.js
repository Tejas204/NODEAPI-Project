import express from "express";
import mongoose from "mongoose";

// create express application
const app = express();

// Using middleware
app.use(express.json());

// Database connection
mongoose.connect("mongodb://localhost:27017", {
    dbName: "backendapi",
}).then(()=>console.log("Database Connected")).catch((e)=>console.log(e));

// Database Schema
const schema  = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const User = mongoose.model("User", schema);

// Route: base
app.get("/", (req, res)=>{
    res.send("Nice");
})

// API: Get all users from the database
app.get("/users/all", async (req, res) => {

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

app.get("/userid/:id", async(req, res)=>{
    const {id} = req.params;
    const user = await User.findById(id);
    
    res.json({
        success: true,
        user
    })
})

// API: Create new user
app.post("/users/new", async (req, res) => {

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

// API: delete an user
app.post("/users/delete", async (req, res)=>{

    const {userid} = req.body;

    await User.deleteOne({
        userid,
    });

    res.status(200).json({
        success: true,
        message: "Deletion successful"
    })
})

// access website on port 4000
app.listen(4000, ()=>{
    console.log("Server is working");
});