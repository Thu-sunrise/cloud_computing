import { asyncHandler } from "../utils/asyncHandler.js";
import { AuthService } from "../services/auth.service.js";
import { OtpService } from "../services/otp.service.js";
import { MailService } from "../services/mail.service.js";
import { TokenService } from "../services/token.service.js";
import { env } from "../config/env.js";

export const register = asyncHandler(async (req, res) => {
  // YOUR CODE HERE
  // 1. Generate OTP
  // 2. Store OTP and user in Redis with expiration
  // 3. Send OTP to user's email
});

export const login = asyncHandler(async (req, res) => {
  // YOUR CODE HERE
});

export const changePassword = asyncHandler(async (req, res) => {
  // YOUR CODE HERE
});

export const forgotPassword = asyncHandler(async (req, res) => {
  // YOUR CODE HERE
});

export const verifyOtp = asyncHandler(async (req, res) => {
  // YOUR CODE HERE
  // 1. Verify OTP from Redis
  // 2. If valid, create user account from stored data
  // 3. Clear OTP and user data from Redis
});

export const refeshToken = asyncHandler(async (req, res) => {
  const tokenDoc = req.cookies.persistent;
  const newPersistentToken = await TokenService.rotatePersistentToken(tokenDoc, req);
  const newSessionToken = await TokenService.rotateSessionToken(tokenDoc.userId);

  res.cookie("session", newSessionToken, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 1000,
  });

  res.cookie("persistent", newPersistentToken, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({ message: "Tokens refreshed" });
});
