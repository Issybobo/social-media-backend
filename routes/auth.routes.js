import express from 'express';
import {login, logout, signup, getMe} from '../controllers/auth.controllers.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router();

router.post("/signup" , signup, (req, res) => {
    
})
router.post("/login", login, (req, res) => {
   
})
router.post("/logout", logout, (req, res) => {
   
})
router.get("/me", protectRoute, getMe, (req, res) => {
   
})

export default router;