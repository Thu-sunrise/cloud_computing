import { Provider } from "../models/provider.model.js";

import seedProviders from "./data/provider.json" with { type: "json" };
import { logger } from "../utils/logger.js";

export const seed = async () => {
  try {
    await Provider.deleteMany();

    await Provider.insertMany(seedProviders);
  } catch (error) {
    logger.error("[SEED] Error", error);
  }
};
