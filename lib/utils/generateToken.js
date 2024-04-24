import jwt from 'jsonwebtoken';

export const generateTokenAndSetCookie = (userId, res) => {

    // function to check the user id that have the token 
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: "15d"
    })

    res.cookie("jwt", token, {
        maxAge: 15*24*60*60*100, // millisecons
        httpOnly: true, // prevent XXS Attack cross-site scripting attacks
        sameSite: "strict", // CSRF attacks cross-site request forgery attacks
        secure: process.env.NODE_ENV !== "development",
    })
}

// command to generate jwt token $ openssl rand -base64 32