import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js"

import connectMongoDB from "./db/connectMongoDB.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// to parse request from body
app.use(express.json());

// to parse form data(urlencoded)
app.use(express.urlencoded({extended: true})); 

// to parse the request and get the jwt cookies
app.use(cookieParser()); 

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectMongoDB();
});