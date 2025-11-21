import { Router } from "express";
import {
  login,
  register,
  changePassword,
  forgotPassword,
  sendOTP,
  verifyOtp,
  refeshToken,
} from "../controllers/auth.controller.js";

export const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/change-password", changePassword);
router.post("/forgot-password", forgotPassword);
router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOtp);
router.post("/refresh-token", refeshToken);
