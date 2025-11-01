import { PersistentToken } from "../models/persistentToken.model.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const TokenService = {
  /*
   * PERSISTENT TOKEN METHODS
   */
  async createPersistentToken(userId, req) {
    const raw = PersistentToken.generateRawToken();
    const hashed = PersistentToken.hash(raw);

    const count = await PersistentToken.countDocuments({ userId, revoked: false });
    if (count >= 5) {
      // Delete oldest
      const oldest = await PersistentToken.findOne({ userId, revoked: false })
        .sort({ createdAt: 1 })
        .limit(1);
      if (oldest) await oldest.deleteOne();
    }

    await PersistentToken.create({
      userId,
      token: hashed,
      userAgent: req.headers["user-agent"],
      ip: req.ip,
      // expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      expiresAt: new Date(Date.now() + 10 * 1000),
    });

    return raw;
  },

  async verifyPersistentToken(rawToken, refresh = 0) {
    const hashed = PersistentToken.hash(rawToken);

    let doc;
    if (refresh == 0) doc = await PersistentToken.findOne({ token: hashed, revoked: false });
    else doc = await PersistentToken.findOne({ token: hashed });

    if (!doc) return null;
    if (doc.expiresAt < Date.now() && refresh == 0) {
      // expired -> revoke
      doc.revoked = true;
      doc.revokedAt = new Date();
      await doc.save();
      // return null;
      // Throw Expire Error here. Not Null doc
      const err = new Error("Persistent token expired");
      err.name = "TokenExpiredError";
      throw err;
    } else if (doc.expiresAt < Date.now() && refresh != 0) {
      doc.revoked = true;
      doc.revokedAt = new Date();
      await doc.save();
    }
    return doc;
  },

  async rotatePersistentToken(oldTokenDoc, req) {
    // Find the old Persistent and adjust its attribute.
    const hashedFind = PersistentToken.hash(oldTokenDoc);
    // const doc = await PersistentToken.findOne({ token: hashedFind, revoked: false });
    const doc = await PersistentToken.findOne({ token: hashedFind });
    if (!doc) return null;
    doc.revoked = true;
    doc.revokedAt = new Date();
    await doc.save();

    // Generate new Persistent to replace
    const raw = PersistentToken.generateRawToken();
    const hashed = PersistentToken.hash(raw);

    // Create new token
    await PersistentToken.create({
      userId: doc.userId,
      token: hashed,
      userAgent: req.headers["user-agent"],
      ip: req.ip,
      // expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      expiresAt: new Date(Date.now() + 10 * 1000),
    });

    return raw;
  },

  /*
   * SESSION TOKEN METHODS
   */
  createSessionToken(payload, expiresIn = "2s") {
    return jwt.sign(payload, env.JWT_SECRET, { expiresIn });
  },

  verifySessionToken(token) {
    try {
      return jwt.verify(token, env.JWT_SECRET);
    } catch (err) {
      throw err; // any Error that will later be handled
    }
  },

  async rotateSessionToken(userId) {
    const user = await User.findById(userId).lean();
    if (!user || user.status === "inactive") return null;
    const payload = { sub: user._id, role: user.role };
    const newSessionToken = TokenService.createSessionToken(payload);
    return { newSessionToken, payload };
  },
};
