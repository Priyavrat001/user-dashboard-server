import User from "../models/user.js";
import { TryCatch } from "../utils/features.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config({});

const getUser = TryCatch(async(req, res, next)=>{
    const user = await User.findById(req.user);

    if(!user){
        return res.status(404).json({
            success:false,
            message:"User not found"
        });
    };

    return res.status(200).json({success:true, user});
});

const logout = TryCatch(async (req, res, next) => {
    // Clear the 'authToken' cookie
    res.cookie('authToken', '', {
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        expires: new Date(0)
    });

    // Send a success response
    res.status(200).json({
        success: true,
        message: "Logged out successfully"
    });
});

const newUser = TryCatch(async (req, res, next) => {
    const { name, username, password } = req.body;

    if(!name || !username || !password){
        return res.status(400).json({
            success:false,
            message:"Invalid credentials"
        });
    };

    const Isuser = await User.findOne({ username });

    if(Isuser){
        return res.status(400).json({
            success:false,
            message:"Invalid credentials"
        });
    };

    const hashPassword = await bcrypt.hash(password, 10);

    await User.create({
        name,
        username,
        password: hashPassword,
    });

    return res.status(200).json({
        success: true,
        message: "User created successfully"
    });
});

const login = TryCatch(async(req, res, next)=>{
    const {username, password} = req.body;

    if(!username || !password){
        return res.status(400).json({
            success:false,
            message:"Invalid credentials"
        });
    };
    const user = await User.findOne({username}).select("+password");

    if(!user){
        return res.status(404).json({
            success:false,
            message:"Invalid credentails"
        });
    };

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(400).json({
            success: false,
            message: "Invalid credentials"
        });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });

    
    res.cookie('authToken', token, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production', 
        sameSite: 'none', 
        maxAge: 3600000 
    });

    res.status(200).json({
        success: true,
        message: "Login successful"
    });
    
});


export{
    getUser,
    logout,
    newUser,
    login
}
