import { Router } from "express";
import {
  login,
  sendOTP,
  forgotPassword,
  logout,
  refreshToken,
  register,
  verifyOtp,
  changePassword,
} from "../controllers/auth.controller.js";

import { requireAuth } from "../middlewares/auth.middleware.js";

export const router = Router();

router.post("/send-otp", sendOTP);

router.post("/verify-otp", verifyOtp);

router.post("/register", register);

router.post("/login", login);

router.post("/change-password", requireAuth, changePassword);

router.post("/forgot-password", forgotPassword);

router.post("/refresh-token", refreshToken);

router.post("/logout", logout);
