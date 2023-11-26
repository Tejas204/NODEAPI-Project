import express from "express";
import userRouter from "./routes/user.js"
import taskRouter from "./routes/task.js"
import {config} from "dotenv"
import cookieParser from "cookie-parser";

// create express application
export const app = express();

// Call the DB URI from the config file
config({
    path:"./data/config.env"
})

// create router
const router = express.Router();

// Using middleware
app.use(express.json());
app.use(cookieParser());


// using routes
app.use("/api/v1/users",userRouter);
app.use("/api/v1/tasks", taskRouter);


// Route: base
app.get("/", (req, res)=>{
    res.send("Nice");
});

