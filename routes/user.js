import express from "express";
import { User } from "../models/user.js";
import { getAllUsers, createNewUser, deleteUser, getUserbyUserId, updateUser } from "../controllers/user.js";

const router = express.Router();

// API: Get all users from the database
router.get("/all", getAllUsers);

// API: Create new user
router.post("/new", createNewUser);

// API: delete an user
router.delete("/delete/:id", deleteUser);

// Update user
router.put("/userid/:id", updateUser);

// API: get user by user id
// Dynamic route should ideally be placed at the end
router.get("/userid/:id", getUserbyUserId);


export default router;