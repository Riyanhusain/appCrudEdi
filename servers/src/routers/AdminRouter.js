import express from "express";
import { createAdmin, getAllAdmin } from "../controllers/AdminController.js";

const adminRouter = express.Router();
adminRouter.get("/getAllAdmin", getAllAdmin);
adminRouter.post("/createAdmin", createAdmin);
export default adminRouter;
