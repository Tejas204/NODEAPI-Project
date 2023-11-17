import express from "express";
import mongoose from "mongoose";

// create express application
const app = express();

// create router
const router = express.Router();

// Using middleware
app.use(express.json());

// Database connection
mongoose.connect("mongodb://localhost:27017", {
    dbName: "backendapi",
}).then(()=>console.log("Database Connected")).catch((e)=>console.log(e));



// Route: base
app.get("/", (req, res)=>{
    res.send("Nice");
});

// access website on port 4000
app.listen(4000, ()=>{
    console.log("Server is working");
});