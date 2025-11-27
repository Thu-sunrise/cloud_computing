import { Router } from "express";
import {
  login,
  register,
  changePassword,
  forgotPassword,
  sendOTP,
  verifyOtp,
  refeshToken,
  logout,
} from "../controllers/auth.controller.js";
import {
  validate,
  validateLogin,
  validateChangePassword,
} from "../middlewares/validate.middleware.js";
import { requireAuth } from "../middlewares/auth.middleware.js";
export const router = Router();

router.post("/register", register);
router.post("/login", validateLogin, validate, login);
router.post("/change-password", requireAuth, validateChangePassword, validate, changePassword);
router.post("/forgot-password", forgotPassword);
router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOtp);
router.post("/refresh-token", refeshToken);
router.post("/logout", logout);
