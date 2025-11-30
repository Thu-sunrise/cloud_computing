import { Router } from "express";
import { requireRole, requireAuth } from "../middlewares/auth.middleware.js";
import { getAllAdmins, createAdmin } from "../controllers/admin.controller.js";

export const router = Router();

router.get("/list", requireAuth, requireRole, getAllAdmins);
router.post("/new", createAdmin);
