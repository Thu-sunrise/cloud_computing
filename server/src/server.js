import http from "http";
import { createApp } from "./app.js";
import { connectDB } from "./config/db.js";
import { env } from "./config/env.js";
import { logger } from "./utils/logger.js";

const bootstrap = async () => {
  await connectDB();
  const app = createApp();
  const server = http.createServer(app);

  server.listen(env.PORT, () => {
    logger.info(`Server listening on port ${env.PORT}`);
  });

  server.on("error", (err) => {
    logger.error("Server error:", err);
    process.exit(1);
  });

  process.on("SIGINT", () => {
    logger.warn("Server shutting down (SIGINT)");
    process.exit(0);
  });

  process.on("SIGTERM", () => {
    logger.warn("Server shutting down (SIGTERM)");
    process.exit(0);
  });
};

bootstrap().catch((err) => {
  logger.error("Fatal bootstrap error:", err);
  process.exit(1);
});
