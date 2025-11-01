import { Router } from "express";
import { login, refeshToken } from "../controllers/auth.controller.js";
import { register, verifyOtp, testToken } from "../controllers/auth.controller.js";
import { validateRegister } from "../middlewares/validate.middleware.js";
import { requireAuth, requireAuth2 } from "../middlewares/auth.middleware.js";

export const router = Router();

// DEFINE ROUTES HERE
// router post /register
// router post /login
// router post /change-password
// router post /forgot-password
// Example:
router.post("/register", validateRegister, register);

router.post("/login", login);

router.post("/verify-otp", verifyOtp);

router.get("/test-token", requireAuth2, testToken);

router.post("/refresh-token", refeshToken);
