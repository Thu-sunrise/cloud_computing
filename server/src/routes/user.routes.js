import { Router } from "express";
// import {...} from "../controllers/user.controller.js";
import {
  getAllUsers,
  getMyInfo,
  getUserById,
  createUser,
  deleteUser,
  updateMyInfo,
} from "../controllers/user.controller.js";
export const router = Router();
import { requireAuth } from "../middlewares/auth.middleware.js";

// Define user-related routes here
router.get("/list", requireAuth, getAllUsers);
router.post("/new", createUser);
router.delete("/profile", requireAuth, deleteUser);
router.put("/profile", requireAuth, updateMyInfo);
router.get("/profile", requireAuth, getMyInfo);
router.get("/:id", requireAuth, getUserById);
// Example: api/user/list?page=1&limit=10&search=abc&sort=asc&role=admin&status=active
// if query params not provided, use default values in controller (remcommended)
