/* eslint n/no-process-exit: "off" */
import { Customer } from "../models/customer.model.js";

import seedCustomers from "./data/customer.json" with { type: "json" };
import { logger } from "../utils/logger.js";

export const seed = async () => {
  try {
    await Customer.deleteMany();

    for (const customer of seedCustomers) {
      await Customer.create({ ...customer });
    }
  } catch (error) {
    logger.error("[SEED] Error", error);
  }
};
