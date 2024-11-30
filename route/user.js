import express from "express";
import { IsAuthenticated } from "../utils/features.js";
import { getUser, login, logout, newUser } from "../controller/user.js";


const app = express.Router();

app.get("/me", IsAuthenticated, getUser);
app.get("/logout", IsAuthenticated, logout);
app.post("/new", newUser);
app.post("/login", login);


export default app;