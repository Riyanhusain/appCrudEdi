import express from "express";
import {
  createTranning,
  deleteTranning,
  getAllTranning,
  updateTranning,
} from "../controllers/TranningController.js";
import { verifyToken } from "../middleware/VerifyTokenMiddleware.js";
const tranningRoute = express.Router();
tranningRoute.get("/getAllTranning", getAllTranning);
tranningRoute.post("/createTranning", verifyToken, createTranning);
tranningRoute.put("/updateTranning/:id", verifyToken, updateTranning);
tranningRoute.delete("/deleteTranning/:id", verifyToken, deleteTranning);
export default tranningRoute;
