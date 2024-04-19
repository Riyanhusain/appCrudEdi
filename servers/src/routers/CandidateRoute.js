import express from "express";
import {
  biodataEntry,
  biodataUpdate,
  biodataUpdateAdmin,
  deleteCandidate,
  getAllCandidate,
  getOneCandidate,
  getProfile,
} from "../controllers/CandidateController.js";
import { verifyToken } from "../middleware/VerifyTokenMiddleware.js";
import {
  candidateOnly,
  hrdOnly,
} from "../middleware/VerifyAccessMiddleware.js";
import {
  resizeImage,
  uploadImageProfile,
} from "../middleware/UploadImageMiddleware.js";
const candidataRoute = express.Router();
candidataRoute.get("/getAllCandidate", verifyToken, hrdOnly, getAllCandidate);
candidataRoute.get(
  "/getOneCandidate/:id",
  verifyToken,
  hrdOnly,
  getOneCandidate
);
candidataRoute.get("/getProfile", verifyToken, candidateOnly, getProfile);
candidataRoute.post("/createCandidate", verifyToken, biodataEntry);
candidataRoute.put(
  "/updateCandidate",
  verifyToken,
  resizeImage,
  uploadImageProfile,
  biodataUpdate
);
candidataRoute.delete(
  "/deleteCandidate/:id",
  verifyToken,
  hrdOnly,
  deleteCandidate
);
candidataRoute.put(
  "/updateCandidateAdmin/:id",
  verifyToken,
  hrdOnly,
  resizeImage,
  uploadImageProfile,
  biodataUpdateAdmin
);

export default candidataRoute;
