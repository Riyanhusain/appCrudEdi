import express from "express";
import {
  loginUser,
  logoutUser,
  refreshToken,
  registerUser,
} from "../controllers/AuthController.js";

const authRouter = express.Router();
authRouter.get("/refreshToken", refreshToken);
authRouter.post("/registerUser", registerUser);
authRouter.post("/loginUsers", loginUser);
authRouter.delete("/logoutUsers", logoutUser);
export default authRouter;
