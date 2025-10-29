import { Router } from "express";
import { refeshToken } from "../controllers/auth.controller.js";

export const router = Router();

// DEFINE ROUTES HERE
// router post /register
// router post /login
// router post /change-password
// router post /forgot-password
// Example:
// router.post("/register", <middleware> ,register);
// router.post("/verify-otp", verifyOtp);

router.post("/refresh-token", refeshToken);
