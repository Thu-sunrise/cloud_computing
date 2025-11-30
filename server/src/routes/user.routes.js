import { Router } from "express";
// import {...} from "../controllers/user.controller.js";
import {
  getAllUsers,
  getMyInfo,
  getUserById,
  createUser,
  deleteUser,
  updateUserById,
} from "../controllers/user.controller.js";
export const router = Router();
import { requireAuth, requireRole } from "../middlewares/auth.middleware.js";

// Define user-related routes here
router.get("/list", requireAuth, requireRole("admin"), getAllUsers);
router.post("/new", createUser);
router.delete("/:id", requireAuth, requireRole("admin"), deleteUser);
router.get("/:id", requireAuth, requireRole("admin"), getUserById);
router.put("/:id", requireAuth, requireRole("admin"), updateUserById);
// Example: api/user/list?page=1&limit=10&search=abc&sort=asc&role=admin&status=active
// if query params not provided, use default values in controller (remcommended)
