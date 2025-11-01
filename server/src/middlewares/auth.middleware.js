import { TokenService } from "../services/token.service.js";

export const requireAuth = async (req, res, next) => {
  const session = req.cookies.sessionToken;
  const persistent = req.cookies.persistentToken;
  try {
    const payload = TokenService.verifySessionToken(session);
    if (payload) {
      req.user = payload;
      return next();
    }
    return res.status(401).json({ message: "Invalid Session Token" });
  } catch (err) {
    // If Sessions Token expired, keep checking on Persistent Token
    if (err.name === "TokenExpiredError") {
      try {
        const doc = await TokenService.verifyPersistentToken(persistent);
        if (!doc) {
          return res.status(401).json({ message: "Invalid persistent token" });
        }

        //Rotate Session Token inside Persistent Token Condition
        const { newSessionToken, payload } = await TokenService.rotateSessionToken(doc.userId);

        if (!newSessionToken) {
          return res.status(401).json({ message: "User not found" });
        }

        res.cookie("sessionToken", newSessionToken, {
          httpOnly: true,
          secure: false, // set to true if using HTTPS
          sameSite: "strict",
          // maxAge: 60 * 60 * 1000,
        });

        req.user = payload;
        return next();
      } catch (err) {
        // In case Persistent Token expired, request user to refresh them all.
        if (err.name === "TokenExpiredError") {
          return res
            .status(400)
            .json({ message: "Persistent Token has expired, please refresh it." });
        }
        return res.status(401).json({ message: "Invalid Persistent Token" });
      }
    }
    return res.status(401).json({ message: "Invalid Session Token" });
  }
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
