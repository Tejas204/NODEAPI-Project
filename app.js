import express from "express";
import mongoose from "mongoose";

// create express application
const app = express();

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

    res.json({
        success: true,
        users,
    });
});

// access website on port 4000
app.listen(4000, ()=>{
    console.log("Server is working");
});