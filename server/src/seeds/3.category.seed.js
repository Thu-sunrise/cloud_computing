import { Category } from "../models/category.model.js";

import seedCategories from "./data/category.json" with { type: "json" };
import { logger } from "../utils/logger.js";

export const seed = async () => {
  try {
    await Category.deleteMany();

    await Category.insertMany(seedCategories);
  } catch (error) {
    logger.error("[SEED] Error", error);
  }
};
