import { asyncHandler } from "../utils/asyncHandler.js";
import { AuthService } from "../services/auth.service.js";
import { OtpService } from "../services/otp.service.js";
import { RedisService } from "../services/redis.service.js";
import { MailService } from "../services/mail.service.js";
import { TokenService } from "../services/token.service.js";
import { PersistentToken } from "../models/persistentToken.model.js";
import { env } from "../config/env.js";

export const register = asyncHandler(async (req, res) => {
  const { mail, password } = req.body;

  const isExisted = await AuthService.checkExistedUser(mail);
  if (isExisted) {
    return res.status(400).json({ message: "This email has already been used." });
  }

  // Create new user that will later be saved after OTP verification
  // For now, this user is then stored in Redis along with the OTP in the controller
  const user = { mail, password };

  // Generate OTP
  const otp = await OtpService.createOtp(mail);
  console.log("otp", otp);

  // Store user data in Redis along with OTP
  const key = `pendingUser:${mail}`;
  const value = { user, otp };
  RedisService.set(key, value, env.OTP_EXPIRE_SEC);

  // Send OTP email
  await MailService.sendOtp(mail, otp);
  return res
    .status(200)
    .json({ message: "OTP sent to your email, complete this to verify registration." });
});

export const login = asyncHandler(async (req, res) => {
  // YOUR CODE HERE
  const { mail, password } = req.body;
  const user = await AuthService.login({ mail, password });

  // Generate Token
  const payload = { sub: user._id.toString(), role: user.role };
  const sessionToken = TokenService.createSessionToken(payload);
  const persistentToken = await TokenService.createPersistentToken(user._id.toString(), req);

  // Attach to cookie
  res.cookie("sessionToken", sessionToken, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict",
    // maxAge: 1 * 10 * 1000, // 10s
  });
  res.cookie("persistentToken", persistentToken, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict",
    // maxAge: 1 * 30 * 1000,
  });

  res.status(200).json({
    message: "Login successful",
    user: user,
  });
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
  // 2. If valid, create user account from stored data. Then generate Token
  // for that valid user.
  // 3. Clear OTP and user data from Redis
  const { mail, otp } = req.body;

  // Verify OTP from Redis
  const isValid = await OtpService.verifyOtp(mail, otp);
  if (!isValid) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  // If valid, create user account from stored data
  const key = `pendingUser:${mail}`;
  const pendingData = await RedisService.get(key);
  if (!pendingData) {
    return res.status(400).json({ message: "No pending registration found" });
  }
  const pendingUser = pendingData.user;
  const newUser = await AuthService.register({
    mail: pendingUser.mail,
    password: pendingUser.password,
  });

  // Generate Tokens for the valid user
  const payload = { sub: newUser._id.toString(), role: newUser.role };
  const sessionToken = TokenService.createSessionToken(payload);
  const persistentToken = await TokenService.createPersistentToken(newUser._id.toString(), req);
  // Attach to cookie
  res.cookie("sessionToken", sessionToken, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict",
    // maxAge: 1 * 10 * 1000, // 10s
  });
  res.cookie("persistentToken", persistentToken, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict",
    // maxAge: 1 * 30 * 1000,
  });

  // Clear OTP and user data from Redis
  await OtpService.clearOtp(newUser.mail);

  // Send Succesul Registration to user mail
  await MailService.sendRegisterSuccess(newUser.mail);

  return res.status(201).json({ message: "Registration successful", user: newUser });
});

export const refeshToken = asyncHandler(async (req, res) => {
  const tokenDoc = req.cookies.persistentToken;
  const newPersistentToken = await TokenService.rotatePersistentToken(tokenDoc, req);

  // Get UserID through doc from new Persistent Token, then gain a new Session Token
  const doc = await TokenService.verifyPersistentToken(newPersistentToken, 1);
  const newSessionToken = await TokenService.rotateSessionToken(doc.userId);

  res.cookie("sessionToken", newSessionToken.newSessionToken, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict",
    // maxAge: 60 * 60 * 1000,
  });

  res.cookie("persistentToken", newPersistentToken, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict",
    // maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({ message: "Tokens refreshed" });
});

//--------------------------TEST-----------------------------------------
export const logout = asyncHandler(async (req, res) => {
  // Gain rawToken
  const rawPersistentToken = req.cookies.persistentToken;
  if (rawPersistentToken) {
    // Hash to find
    const hashed = PersistentToken.hash(rawPersistentToken);
    const tokenDoc = await PersistentToken.findOne({ token: hashed, revoked: false });

    if (tokenDoc) {
      tokenDoc.revoked = true;
      tokenDoc.revokedAt = new Date();
      await tokenDoc.save();
    }
  }

  // Delete Cookie
  res.clearCookie("sessionToken");
  res.clearCookie("persistentToken");

  return res.status(200).json({ message: "Logged out successfully" });
});

export const testToken = asyncHandler(async (req, res) => {
  const Res = "Action Proceeded";
  res.status(200).json({
    message: Res,
  });
});
