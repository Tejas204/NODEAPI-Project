import { app } from "./app.js";
import { connectDB } from "./data/database.js";

// Call DB connection
connectDB();

// access website on port 4000
app.listen(4000, ()=>{
    console.log(`Server is working on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});