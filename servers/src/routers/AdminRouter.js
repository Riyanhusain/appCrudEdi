import express from "express";
import { createAdmin, getAllAdmin } from "../controllers/AdminController.js";
import { verifyToken } from "../middleware/VerifyTokenMiddleware.js";
import { hrdOnly } from "../middleware/VerifyAccessMiddleware.js";

const adminRouter = express.Router();
adminRouter.get("/getAllAdmin", verifyToken, hrdOnly, getAllAdmin);
adminRouter.post("/createAdmin", verifyToken, hrdOnly, createAdmin);
export default adminRouter;
