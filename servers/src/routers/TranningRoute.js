import express from "express";
import { getAllTranning } from "../controllers/TranningController.js";
const tranningRoute = express.Router();
tranningRoute.get("/getAllTranning", getAllTranning);
export default tranningRoute;
