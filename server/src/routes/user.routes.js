import { Router } from "express";
// import {...} from "../controllers/user.controller.js";
import UserController from "../controllers/user.controller.js";
export const router = Router();
import { requireAuth } from "../middlewares/auth.middleware.js";

// Define user-related routes here
router.get("/list", requireAuth, UserController.getAllUsers);
router.post("/new", UserController.createUser);
router.delete("/profile", requireAuth, UserController.deleteUser);
router.put("/profile", requireAuth, UserController.updateMyInfo);
router.get("/profile", requireAuth, UserController.getMyInfo);
router.get("/:id", requireAuth, UserController.getUserById);
// Example: api/user/list?page=1&limit=10&search=abc&sort=asc&role=admin&status=active
// if query params not provided, use default values in controller (remcommended)
