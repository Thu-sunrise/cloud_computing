import { Router } from "express";
import { requireAuth } from "../middlewares/auth.middleware.js";
import AdminController from "../controllers/admin.controller.js";

export const router = Router();

router.get("/list", requireAuth, AdminController.getAllAdmins);
router.get("/list/allUser", requireAuth, AdminController.getAllUsers);
router.get("/profile", requireAuth, AdminController.getMyInfo);
router.put("/profile", requireAuth, AdminController.updateAdmin);
router.delete("/profile", requireAuth, AdminController.deleteAdmin);
router.post("/new", AdminController.createAdmin);
router.get("/:id", AdminController.getAdminById);
router.put("/:id", requireAuth, AdminController.updateUserById);
