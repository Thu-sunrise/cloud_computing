import crypto from "crypto";
import bcrypt from "bcryptjs";

export const generateOtpAndHash = async () => {
  const raw = crypto.randomInt(100000, 999999).toString();
  const hashed = await bcrypt.hash(raw, 10);
  return { raw, hashed };
};

export const generateToken = (length = 32) => {
  return crypto.randomBytes(length).toString("hex");
};
