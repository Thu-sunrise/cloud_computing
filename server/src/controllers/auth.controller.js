import { AuthService } from "../services/auth.service.js";
import { MailService } from "../services/mail.service.js";
import { TokenService } from "../services/token.service.js";
import { RedisService } from "../services/redis.service.js";

import { env } from "../config/env.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../utils/AppError.js";
import { generateOtpAndHash, generateToken } from "../utils/crypto.js";

import bcrypt from "bcryptjs";
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
  const { type } = req.query;
  const { raw, hashed } = await generateOtpAndHash();
  const token = generateToken();
  let storedMail;

  if (type === "register") {
    const { mail, password } = req.body;

    const isExisted = await AuthService.checkExistedUser(mail);
    if (isExisted) {
      return res.status(400).json({ message: "This email has already been used." });
    }
    const key = `otp:${token}`;
    const value = { mail, password, hashed };
    RedisService.set(key, value, env.OTP_EXPIRE_SEC);
    storedMail = mail;
  } else if (type === "forgot-password") {
    const { mail } = req.body;

    const isExisted = await AuthService.checkExistedUser(mail);
    if (!isExisted) {
      return res.status(400).json({ message: "Email has not been used before!" });
    }
    const key = `otp:${token}`;
    const value = { mail, hashed };
    RedisService.set(key, value, env.OTP_EXPIRE_SEC);
    storedMail = mail;
  }
  console.log("otp", raw);
  // Send OTP email
  // await MailService.sendOtp(storedMail, raw);

  return res.status(200).json({ message: token });
});

/**
 * @route POST /auth/verify-otp?token={token}
 * validate request body and params (use validate.middleware.js)
 * get otp from redis using token (if not found, return error)
 * compare otp from request with otpHash from redis (if not match, return error)
 * return success response (no need to return user data)
 */
export const verifyOtp = asyncHandler(async (req, res) => {
  const { token } = req.query;
  const { otp } = req.body;
  const key = `otp:${token}`;
  const data = await RedisService.get(key);
  if (!data) {
    throw new AppError("Invalid or expired token", 400);
  }
  const isValid = await bcrypt.compare(otp, data.hashed);
  if (!isValid) {
    throw new AppError("Invalid OTP", 400);
  }
  return res.status(200).json({ message: "OTP verified successfully" });
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
  const { token } = req.query;
  const key = `otp:${token}`;
  const data = await RedisService.get(key);
  if (!data) {
    throw new AppError("Invalid or expired token", 400);
  }
  const user = await AuthService.register({ mail: data.mail, password: data.password });
  // Generate Persistent Token
  const userAgent = req.headers["user-agent"];
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const persistentToken = await TokenService.createPersistentToken(
    user._id.toString(),
    userAgent,
    ip
  );
  // Generate Session Token
  const payload = { sub: user._id.toString(), role: user.role };
  const sessionToken = TokenService.createSessionToken(payload);

  // Attach to cookie
  res.cookie("sessionToken", sessionToken, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict",
    // maxAge: 1 * 2 * 1000, // 2s
  });
  res.cookie("persistentToken", persistentToken, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict",
    // maxAge: 1 * 10 * 1000,
  });

  return res.status(200).json({ message: "" });
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
  // YOUR CODE HERE
  const { mail, password } = req.body;

  if (mail === "" || password === "")
    return res.status(400).json({ message: "You need to filled completely" });

  const user = await AuthService.login({ mail, password });

  // Generate Persistent Token
  const userAgent = req.headers["user-agent"];
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const persistentToken = await TokenService.createPersistentToken(
    user._id.toString(),
    userAgent,
    ip
  );
  // Generate Session Token
  const payload = { sub: user._id.toString(), role: user.role };
  const sessionToken = TokenService.createSessionToken(payload);
  // Attach to cookie
  res.cookie("sessionToken", sessionToken, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict",
    // maxAge: 1 * 2 * 1000, // 2s
  });
  res.cookie("persistentToken", persistentToken, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict",
    // maxAge: 1 * 10 * 1000,
  });

  return res.status(200).json({
    message: "Login successful",
    user: user,
  });
});

/**
 * @route POST /auth/change-password?token={token}
 * validate request body (use validate.middleware.js)
 * get userId from token
 * updateUser func (use user.service.js, compare current password, new password)
 * return success response (no need to return user data)
 */
export const changePassword = asyncHandler(async (req, res) => {
  // YOUR CODE HERE
});

/**
 * @route POST /auth/forgot-password
 * validate request body (use validate.middleware.js)
 * get mail and newpassword from request body
 * updateUser func (use user.service.js)
 * return success response (no need to return user data)
 */
export const forgotPassword = asyncHandler(async (req, res) => {
  const { mail, newpassword } = req.body;
  const updatedUsser = await AuthService.updatePassword(mail, newpassword);
  return res.status(200).json({ message: "Password updated successfully" });
});

/**
 * @route POST /auth/logout
 * get persistent token from cookies
 * delete tokens from database (use token.service.js)
 * clear cookies for session and persistent tokens
 * return success response
 */

export const refeshToken = asyncHandler(async (req, res) => {
  const tokenDoc = req.cookies.persistentToken;
  const newPersistentTokenDoc = await TokenService.rotatePersistentToken(
    tokenDoc,
    req.headers["user-agent"],
    req.ip
  );
  const newSessionToken = await TokenService.rotateSessionToken(newPersistentTokenDoc.userId);
  // Get UserID through doc from new Persistent Token, then gain a new Session Token
  const doc = await TokenService.verifyPersistentToken(newPersistentTokenDoc.raw);
  // const newSessionToken = await TokenService.rotateSessionToken(doc.userId);
  res.cookie("sessionToken", newSessionToken.newSessionToken, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict",
    // maxAge: 60 * 60 * 1000,
  });
  res.cookie("persistentToken", newPersistentTokenDoc.raw, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict",
    // maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({ message: "Tokens refreshed" });
});

//--------------------------TEST-----------------------------------------
export const logout = asyncHandler(async (req, res) => {
  const persistentToken = req.cookies.persistentToken;
  await TokenService.deletePersistentTokenByRaw(persistentToken);
  res.clearCookie("sessionToken");
  res.clearCookie("persistentToken");
  res.status(200).json({ message: "Logged out successfully" });
});

export const testToken = asyncHandler(async (req, res) => {
  const Res = "Action Proceeded";
  res.status(200).json({
    message: Res,
  });
});
