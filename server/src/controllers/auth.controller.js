import { asyncHandler } from "../utils/asyncHandler.js";
import { AuthService } from "../services/auth.service.js";
import { OtpService } from "../services/otp.service.js";
import { MailService } from "../services/mail.service.js";
import { TokenService } from "../services/token.service.js";
import { env } from "../config/env.js";
import { AppError } from "../utils/AppError.js";
import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

export const register = asyncHandler(async (req, res) => {
  // YOUR CODE HERE

  // 1. Generate OTP
  // 2. Store OTP and user in Redis with expiration
  // 3. Send OTP to user's email
});

export const login = asyncHandler(async (req, res) => {
  const mail = req.body.mail;
  const password = req.body.password;
  console.log(mail, password);
  // transfer the logic to the service
  const user = await AuthService.login({
    mail: mail, 
    password: password
  });
  // create payload for token
  const payload = { sub: user._id, role: user.role };
  // create token
  const sessionToken = TokenService.createSessionToken(payload);
  const persistentToken = await TokenService.createPersistentToken(user._id, req);
  // set cookies for session token
  res.cookie("session", sessionToken, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60*60*1000,
    path: "/"
  });
  // set cookies for persistent token
  res.cookie("persistent", persistentToken, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 30*24*60*60*1000,
    path: "/"
  })
  // send response
  res.status(200).json({
    message: "Login successful",
    user: user,
  });
});

export const changePassword = asyncHandler(async (req, res) => {
  const currentPassword = req.body.currentPassword;
  const newPassword = req.body.newPassword;
  // get information from token
  const userId = req.user.sub;
  // check compare
  if (currentPassword === newPassword){
    throw new AppError("New password must be different from the current password", 400);
  }
  // transfer the logic to the service
  await AuthService.changePassword({userId, currentPassword, newPassword});
  // delete cookie token session
  res.clearCookie("session", {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/"
  });
  // delete cookie token persistent
  res.clearCookie("persistent", {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/"
  });
  // send response
  res.status(200).json({
    message: "Password changed successfully. Please log in again.",
  });
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
