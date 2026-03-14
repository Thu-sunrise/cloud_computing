import { register } from "../monitoring/metrics.js";

export const metricsEndpoint = async (req, res) => {
  res.set("Content-Type", register.contentType);

  res.end(await register.metrics());
};
