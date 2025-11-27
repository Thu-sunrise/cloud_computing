import { AuthService } from "../services/auth.service.js";
import { MailService } from "../services/mail.service.js";
import { TokenService } from "../services/token.service.js";
import { RedisService } from "../services/redis.service.js";
import { env } from "../config/env.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../utils/AppError.js";
import { generateOtpAndHash, generateToken } from "../utils/crypto.js";

/**
 * @route POST /auth/send-otp?type={register|forgot-password}
 * validate request body and params (use validate.middleware.js)
 * check user existence in database (use user.service.js):
 * - if register: user should not exist
 * - if forgot-password: user should exist
 * store otp, token, user data in redis:
 * - register: key = otp:<token>, value = {mail, pw, otpHash}
 * - forgot-password: key = otp:<token>, value = {mail, otpHash}
 * send otp email
 * return token in response
 */
export const sendOTP = asyncHandler(async (req, res) => {
  // YOUR CODE HERE
});

/**
 * @route POST /auth/verify-otp?token={token}
 * validate request body and params (use validate.middleware.js)
 * get otp from redis using token (if not found, return error)
 * compare otp from request with otpHash from redis (if not match, return error)
 * return success response (no need to return user data)
 */
export const verifyOtp = asyncHandler(async (req, res) => {
  // YOUR CODE HERE
});

/**
 * @route POST /auth/register?token={token}
 * validate request body and params (use validate.middleware.js)
 * get user data from redis using token (if not found, return error)
 * create user in database (use user.service.js)
 * generate session and persistent tokens (use token.service.js)
 * set cookies for session and persistent tokens
 * return success response (no need to return user data)
 */
export const register = asyncHandler(async (req, res) => {
  // YOUR CODE HERE
});

/**
 * @route POST /auth/login
 * validate request body (use validate.middleware.js)
 * check user existence and password (use auth.service.js)
 * create session and persistent tokens (use token.service.js)
 * set cookies for session and persistent tokens
 * return success response (no need to return user data)
 */
export const login = asyncHandler(async (req, res) => {
  const mail = req.body.mail;
  const password = req.body.password;
  console.log(password);
  // transfer the logic to the service
  const user = await AuthService.login({
    mail: mail,
    password: password,
  });
  user.password = undefined;
  // create session token
  const payload = { sub: user._id, role: user.role };
  const sessionToken = await TokenService.createSessionToken(payload);
  // create persistent token
  const userAgent = req.headers["user-agent"];
  const persistentToken = await TokenService.createPersistentToken(user._id, userAgent);
  // set cookies for session token
  res.cookie("session", sessionToken, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 1000,
    path: "/",
  });
  // set cookies for persistent token
  res.cookie("persistent", persistentToken, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
    path: "/",
  });
  // send response
  res.status(200).json({
    message: "Login successful",
    user: user,
  });
});

/**
 * @route POST /auth/change-password
 * validate request body (use validate.middleware.js)
 * get userId from token
 * updateUser func (use user.service.js, compare current password, new password)
 * return success response (no need to return user data)
 */
export const changePassword = asyncHandler(async (req, res) => {
  const currentPassword = req.body.currentPassword;
  const newPassword = req.body.newPassword;
  // get information from token
  const userId = req.user.sub;
  // check compare
  if (currentPassword === newPassword) {
    throw new AppError("New password must be different from the current password", 400);
  }
  // transfer the logic to the service
  await AuthService.changePassword({ userId, currentPassword, newPassword });
  // send response
  res.status(200).json({
    message: "Password changed successfully. Please log in again.",
  });
});

/**
 * @route POST /auth/forgot-password
 * validate request body (use validate.middleware.js)
 * get mail and newpassword from request body
 * updateUser func (use user.service.js)
 * return success response (no need to return user data)
 */
export const forgotPassword = asyncHandler(async (req, res) => {
  // YOUR CODE HERE
});

/**
 * @route POST /auth/logout
 * get persistent token from cookies
 * delete tokens from database (use token.service.js)
 * clear cookies for session and persistent tokens
 * return success response
 */
export const logout = asyncHandler(async (req, res) => {
  // delete cookie token session
  res.clearCookie("session", {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });
  // delete cookie token persistent
  res.clearCookie("persistent", {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });
  // send response
  res.status(200).json({
    message: "Logged out successfully.",
  });
});

export const refeshToken = asyncHandler(async (req, res) => {
  const tokenDoc = req.cookies.persistent;
  const newPersistentToken = await TokenService.rotatePersistentToken(
    tokenDoc,
    req.headers["user-agent"],
    req.ip
  );
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
