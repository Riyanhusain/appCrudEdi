import express from "express";
import {
  createEducation,
  deleteEducation,
  editEducation,
  getAllEducation,
  getOneEducation,
} from "../controllers/EducationController.js";
import { verifyToken } from "../middleware/VerifyTokenMiddleware.js";
const educationRoute = express.Router();
educationRoute.get("/getAllEducation", getAllEducation);
educationRoute.post("/createEducation", verifyToken, createEducation);
educationRoute.put("/updateEducation/:id", verifyToken, editEducation);
educationRoute.delete("/deleteEducation/:id", verifyToken, deleteEducation);
export default educationRoute;
