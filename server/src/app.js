import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import createError from "http-errors";

import routes from "./routes/index.js";
import { env } from "./config/env.js";
import { errorHandler } from "./middlewares/error.middleware.js";

export const createApp = () => {
  const app = express();

  app.use(helmet()); // Security headers
  app.use(cors({ origin: env.CORS_ORIGIN, credentials: true })); // CORS
  app.use(express.json({ limit: "1mb" })); // Body parser
  app.use(morgan("dev")); // Logging
  app.use(cookieParser()); // Cookie parser

  // Routes
  app.use("/api", routes);
  // 404 handler
  app.use((_req, _res, next) => next(createError(404, "Not Found")));
  // Error handler
  app.use(errorHandler);

  return app;
};
