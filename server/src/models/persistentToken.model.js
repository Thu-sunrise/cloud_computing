import mongoose from "mongoose";
import crypto from "crypto";

const persistentTokenSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    token: { type: String, required: true, index: true },
    userAgent: { type: String },
    ip: { type: String },
    expiresAt: { type: Date, required: true },
    revoked: { type: Boolean, default: false },
    revokedAt: Date,
  },
  { timestamps: true }
);

persistentTokenSchema.statics.generateRawToken = function () {
  return crypto.randomBytes(64).toString("hex");
};

persistentTokenSchema.statics.hash = function (raw) {
  return crypto.createHash("sha256").update(raw).digest("hex");
};

export const PersistentToken = mongoose.model("PersistentToken", persistentTokenSchema);
