import express from "express";
import userRouter from "./routes/user.js"
import { connectDB } from "./data/database.js";

// create express application
const app = express();

// Call DB connection
connectDB();

// create router
const router = express.Router();

// Using middleware
app.use(express.json());
app.use("/users",userRouter);


// Route: base
app.get("/", (req, res)=>{
    res.send("Nice");
});

// access website on port 4000
app.listen(4000, ()=>{
    console.log("Server is working");
});