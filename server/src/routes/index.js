// Main router file to aggregate all route modules
import express from "express";
import { router as authRoutes } from "./auth.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);

export default router;
