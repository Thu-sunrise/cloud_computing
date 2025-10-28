import { Router } from "express";
import { changePassword, login, register } from "../controllers/auth.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { validate, validateLogin, validateChangePassword } from "../middlewares/validate.middleware.js";
export const router = Router();

// DEFINE ROUTES HERE
// router post /register
// router post /login
// router post /change-password
// router post /forgot-password
// Example:
router.post("/register", register);
router.post("/login", validateLogin, validate, login);
router.post("/change-password", requireAuth, validateChangePassword, validate, changePassword);
// module.exports = router;
