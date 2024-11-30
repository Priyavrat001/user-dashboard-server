import jwt from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config({});


const TryCatch = (func)=>async(req, res, next)=>{
    try {
        await func(req, res, next);
    } catch (err) {
        next(err);
    }
};


const IsAuthenticated = TryCatch(async(req, res, next)=>{
    const token = req.cookies["authToken"];

    if(!token){
        return res.status(400).json({
            sucess:false,
            message:"Invalid credentails"
        });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user ID or other info to the request object
    req.user = { _id: decoded.userId };

    next()    
});

const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack); // Log the error for debugging (optional in production)

    // Default error status and message
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    // Respond with the error
    res.status(statusCode).json({
        success: false,
        message,
    });
};


export{
    TryCatch,
    IsAuthenticated,
    errorMiddleware
}
