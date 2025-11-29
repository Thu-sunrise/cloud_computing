import crypto from "crypto";
import bcrypt from "bcryptjs";

export const generateOtpAndHash = async () => {
  const otpRaw = crypto.randomInt(100000, 999999).toString();
  const otpHashed = await bcrypt.hash(otpRaw, 10);
  return { otpRaw, otpHashed };
};

export const generateToken = (length = 32) => {
  return crypto.randomBytes(length).toString("hex");
};
