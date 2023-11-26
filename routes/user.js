import express from "express";
import { User } from "../models/user.js";
import { getAllUsers, register, login, deleteUser, getMyProfile, updateUser, logout } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// API: Get all users from the database
router.get("/all", getAllUsers);

// API: Register
router.post("/new", register);

// API: login
router.post("/login", login);

// API: get user by user id
// API: Update user
// API: delete an user
// If base route is the same, we can chain the calls together as below
// router.route("/userid/:id").get(getMyProfile).put(updateUser).delete(deleteUser);

// API: Get logged in user deyails
router.get("/me", isAuthenticated, getMyProfile);

// API: Logout
router.get("/logout", logout);

export default router;