import client from "prom-client";
import { register } from "./metrics.js";

/**
 * Tổng số HTTP requests
 */
export const httpRequestsTotal = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status"],
  registers: [register],
});

/**
 * Thời gian xử lý request (latency)
 */
export const httpRequestDurationSeconds = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "route", "status"],
  buckets: [0.1, 0.3, 0.5, 1, 2, 5],
  registers: [register],
});

/**
 * Số request đang được xử lý
 */
export const activeRequests = new client.Gauge({
  name: "http_active_requests",
  help: "Number of active HTTP requests",
  registers: [register],
});
