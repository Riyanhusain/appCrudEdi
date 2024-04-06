import express from "express";
import { getAllExperience } from "../controllers/ExperianceController.js";
const experianceRoute = express.Router();
experianceRoute.get("/getAllExperiance", getAllExperience);
export default experianceRoute;
