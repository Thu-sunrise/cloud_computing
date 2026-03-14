import {
  httpRequestsTotal,
  httpRequestDurationSeconds,
  activeRequests,
} from "../monitoring/httpMetrics.js";

export const metricsMiddleware = (req, res, next) => {
  activeRequests.inc();
  const start = process.hrtime();

  res.on("finish", () => {
    const diff = process.hrtime(start);
    const duration = diff[0] + diff[1] / 1e9;

    const labels = {
      method: req.method,
      route: req.route?.path || req.path,
      status: res.statusCode,
    };

    httpRequestDurationSeconds.observe(labels, duration);
    httpRequestsTotal.inc(labels);

    activeRequests.dec();
  });

  next();
};
