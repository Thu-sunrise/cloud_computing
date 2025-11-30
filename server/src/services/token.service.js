import jwt from "jsonwebtoken";

import { PersistentToken } from "../models/persistentToken.model.js";
import { User } from "../models/user.model.js";

import { AppError } from "../utils/AppError.js";
import { env } from "../config/env.js";
import { raw } from "express";

export const TokenService = {
  /*
   * PERSISTENT TOKEN METHODS
   */
  async createPersistentToken(userId, userAgent, ip) {
    const raw = PersistentToken.generateRawToken();
    const hashed = PersistentToken.hash(raw);
    const count = await PersistentToken.countDocuments({ userId });
    if (count >= 5) {
      // Delete oldest
      const oldest = await PersistentToken.findOne({ userId }).sort({ createdAt: 1 }).limit(1);
      if (oldest) await oldest.deleteOne();
    }

    await PersistentToken.create({
      userId,
      token: hashed,
      userAgent: userAgent,
      ip: ip,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });

    return raw;
  },
  async verifyPersistentToken(rawToken) {
    const doc = await this.getPersistentTokenByRaw(rawToken);

    if (!doc) return null;
    if (doc.expiresAt < Date.now()) {
      // expired -> revoke
      doc.revoked = true;
      doc.revokedAt = new Date();
      await doc.save();
      throw new AppError("PersistentTokenExpiredError", 400);
    }
    // Refresh to return doc to convert data form old Token
    return doc;
  },
  async rotatePersistentToken(rawOldToken, userAgent, ip) {
    let oldTokenDoc = await this.getPersistentTokenByRaw(rawOldToken);
    if (!oldTokenDoc) {
      throw new AppError("Invalid persistent token", 400);
    }
    oldTokenDoc.revoked = true;
    oldTokenDoc.revokedAt = new Date();
    await oldTokenDoc.save();
    // Generate new Persistent to replace
    const rawToken = PersistentToken.generateRawToken();
    const hashed = PersistentToken.hash(raw);
    // Create new token
    await PersistentToken.create({
      userId: oldTokenDoc.userId,
      token: hashed,
      userAgent: userAgent,
      ip: ip,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });
    return { rawToken, userId: oldTokenDoc.userId };
  },

  async getPersistentTokenByRaw(rawToken) {
    const hashed = PersistentToken.hash(rawToken);
    return PersistentToken.findOne({ token: hashed });
  },

  async deletePersistentTokenByRaw(rawToken) {
    const hashed = PersistentToken.hash(rawToken);
    return PersistentToken.deleteOne({ token: hashed });
  },

  /*
   * SESSION TOKEN METHODS
   */
  createSessionToken(payload, expiresIn = "15s") {
    return jwt.sign(payload, env.JWT_SECRET, { expiresIn });
  },

  verifySessionToken(token) {
    try {
      return jwt.verify(token, env.JWT_SECRET);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        throw new AppError("SessionTokenExpiredError", 400);
      }
    }
  },

  async rotateSessionToken(userId) {
    const user = await User.findById(userId);
    if (!user || user.status === "inactive") {
      return null;
    }
    const payload = { sub: user._id, role: user.role };
    const newSessionToken = TokenService.createSessionToken(payload);
    return { newSessionToken, payload };
  },
};
