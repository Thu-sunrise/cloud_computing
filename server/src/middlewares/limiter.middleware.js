import { RedisService } from "../services/redis.service.js";

export const rateLimit =
  ({ keyPrefix, limit = 5, window = 60 }) =>
  async (req, res, next) => {
    const ip = req.ip;
    const key = `${keyPrefix}:${ip}`;

    const attempts = await RedisService.incr(key);

    if (attempts === 1) {
      await RedisService.expire(key, window);
    }

    if (attempts > limit) {
      return res.status(429).json({
        message: "Too many requests. Please try again later.",
      });
    }

    next();
  };
