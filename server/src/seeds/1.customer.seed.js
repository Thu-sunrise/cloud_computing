import { Customer } from "../models/customer.model.js";
import { Wallet } from "../models/wallet.model.js";

import seedCustomers from "./data/customer.json" with { type: "json" };
import { logger } from "../utils/logger.js";

export const seed = async () => {
  try {
    await Customer.deleteMany();

    for (const customer of seedCustomers) {
      const c = await Customer.create({ ...customer });
      await Wallet.create({ userId: c._id });
    }
  } catch (error) {
    logger.error("[SEED] Error", error);
  }
};
