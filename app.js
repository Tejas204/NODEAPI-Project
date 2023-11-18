import express from "express";
import userRouter from "./routes/user.js"

// create express application
export const app = express();

// create router
const router = express.Router();

// Using middleware
app.use(express.json());
app.use("/users",userRouter);


// Route: base
app.get("/", (req, res)=>{
    res.send("Nice");
});

