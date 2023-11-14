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

// access website on port 4000
app.listen(4000, ()=>{
    console.log("Server is working");
});