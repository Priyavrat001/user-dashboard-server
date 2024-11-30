import express from "express";
import { IsAuthenticated } from "../utils/features.js";
import {getAllData} from "../controller/data.js";

const app = express.Router();

app.get("/data", IsAuthenticated, getAllData);


export default app;