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
  // YOUR CODE HERE
});

/**
 * @route POST /auth/change-password
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
  // YOUR CODE HERE
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
