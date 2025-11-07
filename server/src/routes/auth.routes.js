import { Router } from "express";
import {
  login,
  sendOTP,
  testToken,
  forgotPassword,
  logout,
  refeshToken,
} from "../controllers/auth.controller.js";
import { validateInput } from "../middlewares/validate.middleware.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

export const router = Router();

// DEFINE ROUTES HERE
// router post /register
// router post /login
// router post /change-password
// router post /forgot-password
// Example:
router.post("/sendOTP", validateInput, sendOTP);

router.post("/login", validateInput, login);

router.post("/forgot-password", forgotPassword);

router.get("/test-token", requireAuth, testToken);

router.post("/refresh-token", refeshToken);

router.post("/logout", logout);
