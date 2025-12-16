import { Router } from "express";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { getUser } from "../controllers/user.controller.js";

export const router = Router();

router.get("/me", requireAuth, getUser);
