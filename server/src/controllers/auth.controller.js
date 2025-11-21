import { asyncHandler } from "../utils/asyncHandler.js";
import { AuthService } from "../services/auth.service.js";
import { OtpService } from "../services/otp.service.js";
import { RedisService } from "../services/redis.service.js";
import { MailService } from "../services/mail.service.js";
import { TokenService } from "../services/token.service.js";
import { PersistentToken } from "../models/persistentToken.model.js";
import { env } from "../config/env.js";

export const sendOTP = asyncHandler(async (req, res) => {
  const { type } = req.query;

  let storedMail;
  if (type === "register") {
    const { mail, password } = req.body;
    // Check for mail and password
    if (mail === "" || password === "")
      return res.status(400).json({ message: "You need to filled completely" });

    const isExisted = await AuthService.checkExistedUser(mail);
    if (isExisted) {
      return res.status(400).json({ message: "This email has already been used." });
    }

    // For now this user will be saved to redis and will be
    // officialy saved after being verified
    const user = { mail, password };
    // Store user data in Redis
    const key = `pendingUser:${mail}`;
    const value = user;
    RedisService.set(key, value, env.OTP_EXPIRE_SEC);

    // extract mail into storedMail
    storedMail = mail;
  } else if (type === "forgot-password") {
    const { mail } = req.body;
    const isExisted = await AuthService.checkExistedUser(mail);
    if (!isExisted) {
      return res.status(400).json({ message: "No email found!" });
    }

    // Check for required email and email conditions
    if (!mail) {
      return res.status(400).json({ message: "Email is required" });
    }
    const user = AuthService.checkExistedUser(mail);
    if (!user) res.status(400).json({ message: "Email has not been used before!" });

    // extract mail into storedMail
    storedMail = mail;
  }
  // Generate OTP
  const otp = await OtpService.createOtp(storedMail);
  console.log("otp", otp);
  // Store otp into Redis
  const key = `mail:${storedMail}`;
  const value = otp;
  RedisService.set(key, value, env.OTP_EXPIRE_SEC);

  // Send OTP email
  await MailService.sendOtp(storedMail, otp);
  return res.status(200).json({ message: "Otp has been to your email" });
});

export const register = asyncHandler(async (req, res) => {
  const { mail, otp } = req.body;

  // validate OTP from redis
  const key1 = `mail:${mail}`;
  const OTP = await RedisService.get(key1);
  console.log(OTP);
  if (!OTP || otp !== OTP) {
    return res.status(400).json({ message: "Invalid OTP!" });
  }

  // If valid, create user account from stored data
  const key2 = `pendingUser:${mail}`;
  const pendingData = await RedisService.get(key2);
  if (!pendingData) {
    return res.status(400).json({ message: "No pending registration found" });
  }
  const newUser = await AuthService.register({
    mail: pendingData.mail,
    password: pendingData.password,
  });

  // Generate Token
  const payload = { sub: newUser._id.toString(), role: newUser.role };
  const sessionToken = TokenService.createSessionToken(payload);
  const persistentToken = await TokenService.createPersistentToken(newUser._id.toString(), req);

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

  return res.status(200).json({ message: newUser });
});

export const login = asyncHandler(async (req, res) => {
  // YOUR CODE HERE
  const { mail, password } = req.body;

  if (mail === "" || password === "")
    return res.status(400).json({ message: "You need to filled completely" });

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
    // maxAge: 1 * 2 * 1000, // 2s
  });
  res.cookie("persistentToken", persistentToken, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict",
    // maxAge: 1 * 10 * 1000,
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
  const { mail, newpassword, otp } = req.body;

  // Get OTP form Redis and verify
  const key = `mail:${mail}`;
  const OTP = await RedisService.get(key);
  console.log(OTP);
  console.log(otp);
  if (!OTP || otp != OTP) {
    return res.status(400).json({ message: "Invalid OTP!" });
  }

  // Set password
  const user = AuthService.forgotPassword({ mail, newpassword });
  return res.status(200).json({ message: "Changed password successfully!" });
});

export const forgotPasswordOTP = asyncHandler(async (req, res) => {
  const { mail, newpassword, otp } = req.body;

  // Verify OTP from Redis
  const isValid = await OtpService.verifyOtp(mail, otp);
  if (!isValid) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  // Change password on valid OTP
  const user = await AuthService.forgotPasswordOTP({ mail, newpassword });
  if (!user) return res.status(500).json({ message: "Set new password failed. Try again!" });
  return res.status(200).json({ message: "New password has been set.", user: user });
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
