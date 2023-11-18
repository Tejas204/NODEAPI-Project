import express from "express";
import userRouter from "./routes/user.js"
import {config} from "dotenv"

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
app.use("/users",userRouter);


// Route: base
app.get("/", (req, res)=>{
    res.send("Nice");
});

