import express from "express";
import {
  biodataEntry,
  biodataUpdate,
  deleteCandidate,
  getAllCandidate,
  getOneCandidate,
  getProfile,
} from "../controllers/CandidateController.js";
import { verifyToken } from "../middleware/VerifyTokenMiddleware.js";
import { hrdOnly } from "../middleware/VerifyAccessMiddleware.js";
const candidataRoute = express.Router();
candidataRoute.get("/getAllCandidate", verifyToken, hrdOnly, getAllCandidate);
candidataRoute.get(
  "/getOneCandidate/:id",
  verifyToken,
  hrdOnly,
  getOneCandidate
);
candidataRoute.get("/getProfile", verifyToken, getProfile);
candidataRoute.post("/createCandidate", verifyToken, biodataEntry);
candidataRoute.put("/updateCandidate", verifyToken, biodataUpdate);
candidataRoute.delete(
  "/deleteCandidate/:id",
  verifyToken,
  hrdOnly,
  deleteCandidate
);

export default candidataRoute;
