import { TokenService } from "../services/token.service.js";

export const requireAuth = async (req, res, next) => {
  const session = req.cookies.session;
  const persistent = req.cookies.persistent;
  try {
    const payload = TokenService.verifySessionToken(session);
    if (payload) {
      req.user = payload;
      return next();
    }
  } catch (err) {
    if (err.name !== "TokenExpiredError") {
      return res.status(401).json({ message: "Invalid session token" });
    }
  }

  if (!persistent) {
    return res.status(401).json({ message: "Authentication required" });
  }

  const doc = await TokenService.verifyPersistentToken(persistent);

  if (!doc) {
    return res.status(401).json({ message: "Invalid persistent token" });
  }

  const { newSessionToken, payload } = await TokenService.rotateSessionToken(doc.userId);

  if (!newSessionToken) {
    return res.status(401).json({ message: "User not found" });
  }

  res.cookie("session", newSessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 1000,
  });

  req.user = payload;

  next();
};

export const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
};
