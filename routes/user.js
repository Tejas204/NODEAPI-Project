import express from "express";
import { User } from "../models/user.js";
import { getAllUsers, createNewUser, deleteUser, getUserbyUserId, updateUser } from "../controllers/user.js";

const router = express.Router();

// API: Get all users from the database
router.get("/all", getAllUsers);

// API: Create new user
router.post("/new", createNewUser);

// API: get user by user id
// API: Update user
// API: delete an user

// If base route is the same, we can chain the calls together as below
router.route("/userid/:id").get(getUserbyUserId).put(updateUser).delete(deleteUser);

export default router;