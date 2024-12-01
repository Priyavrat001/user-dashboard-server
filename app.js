import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToMongo from "./utils/db.js";
import userRoute from "./route/user.js";
import dataRoute from "./route/data.js";
import { errorMiddleware } from "./utils/features.js";

dotenv.config({}); // Load environment variables

const app = express();
const port = process.env.PORT || 4000;

// Connect to MongoDB
connectToMongo(process.env.MONGO_URI);

// Middlewares
app.use(express.json());
app.use(cookieParser()); // Fixed: Call cookieParser as a function
app.use(
    cors({
        origin: (origin, callback) => {
            const allowedOrigins = [
                "http://localhost:5172",
                "http://localhost:5173",
                "https://user-dashboard-frontend.netlify.app",
            ];
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true, // To allow cookies
    })
);

// Test route
app.get("/", (req, res) => {
    res.send("It's working just fine");
});

// User routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1", dataRoute);

// Error handling middleware
app.use(errorMiddleware);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
