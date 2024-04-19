import express from "express";
import {
  createExperience,
  deleteExperience,
  getAllExperience,
  updateExperience,
} from "../controllers/ExperianceController.js";
import { verifyToken } from "../middleware/VerifyTokenMiddleware.js";
const experianceRoute = express.Router();
experianceRoute.get("/getAllExperiance", getAllExperience);
experianceRoute.post("/createExperience", verifyToken, createExperience);
experianceRoute.put("/updateExperience/:id", verifyToken, updateExperience);
experianceRoute.delete("/deleteExperience/:id", verifyToken, deleteExperience);
export default experianceRoute;
