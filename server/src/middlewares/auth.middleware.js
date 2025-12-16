import { verifyToken } from "../utils/jwt.js";

export const requireAuth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Missing token" });
  }
  const payload = verifyToken(token);
  if (!payload) {
    return res.status(401).json({ message: "Invalid token" });
  }
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
