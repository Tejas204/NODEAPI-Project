import express from "express";
import { User } from "../models/user.js";
import { getAllUsers, createNewUser, deleteUser, getUserbyUserId } from "../controllers/user.js";

const router = express.Router();

// API: Get all users from the database
router.get("/all", getAllUsers);


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
router.get("/userid/:id", getUserbyUserId);



// API: delete an user
router.post("/delete", deleteUser);

// API: Create new user
router.post("/new", createNewUser);

export default router;