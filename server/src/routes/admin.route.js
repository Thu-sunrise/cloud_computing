import { Router } from "express";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { getAllAdmins, createAdmin, updateUserById } from "../controllers/admin.controller.js";

export const router = Router();

router.get("/list", requireAuth, getAllAdmins);
router.post("/new", createAdmin);
router.put("/:id", requireAuth, updateUserById);
