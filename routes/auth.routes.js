import express from 'express';
import {signup } from '../controllers/auth.controllers.js';

const router = express.Router();

router.post("/signup" , signup, (req, res) => {
    
})
router.get("/login", (req, res) => {
   
})
router.get("/logout", (req, res) => {
   
})

export default router;