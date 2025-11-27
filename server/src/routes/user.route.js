import { Router } from "express";
// import {...} from "../controllers/user.controller.js";
import UserController from "../controllers/user.controller.js";
export const router = Router();
import { requireAuth } from "../middlewares/auth.middleware.js";

// Define user-related routes here
router.get("/list", UserController.getAllUsers);
router.get("/profile", requireAuth, UserController.getMyInfo);
router.put("/profile", requireAuth, UserController.updateUser);
router.put("/:id", UserController.updateUser);
router.get("/:id", UserController.getUserById);
router.post("/new", UserController.createUser);
router.delete("/:id", requireAuth, UserController.deleteUser);
// Example: api/user/list?page=1&limit=10&search=abc&sort=asc&role=admin&status=active
// if query params not provided, use default values in controller (remcommended)
