import User from "../models/user.model.js"
import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js";
import bcrypt from "bcryptjs"


export const signup = async (req, res) => {
    try {
        const {fullName, username, email, password} = req.body;
 
        // check for correct email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({error: "Invalid email format"});
        }

        // check if user exist
        const existingUser = await User.findOne({username});
        if(existingUser){
            return res.status(400).json({error: "Username is already taken"});
        }

        // check if email already exist
        const existingEmail = await User.findOne({email});
        if(existingEmail){
            return res.status(400).json({error: "Email is already taken"});
        }

        if(password.length < 6) {
            return res.status(400).json({error: "Password must be at least 6 character long"})
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        // create new user since all the condition is true
        const newUser = new User({
            fullName,
            username,
            email, 
            password: hashedPassword
        });
         
        // generate token
        if(newUser){
            generateTokenAndSetCookie(newUser.id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                email: newUser.email,
                followers: newUser.followers,
                following: newUser.following,
                profileImg: newUser.profileImg,
                coverImg: newUser.coverImg,
            });
        } else {
            res.status(400).json({error: "Invalid user data"});
        }
    } catch (error) {
        // Handle errors here
        console.log("Error in signup controller", error.message);
        res.status(500).json({error: "Internal server error"});
    }
};