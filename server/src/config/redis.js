import Redis from "ioredis";
import { logger } from "../utils/logger.js";
import { env } from "./env.js";

const redis = new Redis({
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,

  //   password: env.REDIS_PASSWORD,

  // 0 means no limit
  retryStrategy(times) {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
});

redis.on("connect", () => {
  logger.info("Redis connected");
});

redis.on("error", (err) => {
  logger.error(`Redis error: ${err}`);
});

export default redis;
