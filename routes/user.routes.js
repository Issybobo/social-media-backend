import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import  {getUserProfile, followUnfollowUser } from "../controllers/user.controllers.js";
// Assuming this is in your auth.routes.js or a similar routes file
import { } from '../controllers/user.controllers.js';

const router = express.Router();

router.get("/profile/:username", protectRoute, getUserProfile);
router.get("/suggested/:username", protectRoute,  getUserProfile);
router.post("/follow/:id",   protectRoute, followUnfollowUser);
//router.post("/update", protectRoute,  updateUserProfile);

// Define the route for follow/unfollow functionality
//router.post("/user/follow/:id", protectRoute, followUnfollowUser);

export default router;