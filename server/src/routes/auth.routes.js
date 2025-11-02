import { Router } from "express";
import { forgotPasswordOTP, login, refeshToken } from "../controllers/auth.controller.js";
import { register, verifyOtp, testToken, forgotPassword } from "../controllers/auth.controller.js";
import { validateInput } from "../middlewares/validate.middleware.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

export const router = Router();

// DEFINE ROUTES HERE
// router post /register
// router post /login
// router post /change-password
// router post /forgot-password
// Example:
router.post("/register", validateInput, register);

router.post("/login", validateInput, login);

router.post("/verify-otp", verifyOtp);

router.post("/forgot-password", forgotPassword);

router.post("/forgot-password-otp", forgotPasswordOTP);

router.get("/test-token", requireAuth, testToken);

router.post("/refresh-token", requireAuth, refeshToken);
