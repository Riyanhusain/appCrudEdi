import express from "express";
import { getAllEducation } from "../controllers/EducationController.js";
const educationRoute = express.Router();
educationRoute.get("/getAllEducation", getAllEducation);
export default educationRoute;
