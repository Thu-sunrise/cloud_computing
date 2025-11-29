import { Router } from "express";
import {
  login,
  sendOTP,
  testToken,
  forgotPassword,
  logout,
  refeshToken,
  register,
  verifyOtp,
  changePassword,
} from "../controllers/auth.controller.js";
import { validateInput } from "../middlewares/validate.middleware.js";
import { requireAuth } from "../middlewares/auth.middleware.js";
// import { verify } from "jsonwebtoken";

export const router = Router();

// DEFINE ROUTES HERE
// router post /register
// router post /login
// router post /change-password
// router post /forgot-password
// Example:
router.post("/send-otp", sendOTP);

router.post("/verify-otp", verifyOtp);

router.post("/register", register);

router.post("/login", validateInput, login);

router.post("/change-password", requireAuth, validateInput, changePassword);

router.post("/forgot-password", forgotPassword);

router.get("/test-token", requireAuth, testToken);

router.post("/refresh-token", refeshToken);

router.post("/logout", logout);
