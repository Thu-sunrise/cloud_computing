import { Product } from "../models/product.model.js";
import { Category } from "../models/category.model.js";
import { Customer } from "../models/customer.model.js";

/**
 * 1-532 -> active
 * 533-892 -> sold
 * 893-1072 -> pending
 * 1073-1252 -> rejected
 * 1253-1432 -> deleted
 */
import seedProducts from "./data/product.json" with { type: "json" };
import { logger } from "../utils/logger.js";

export const seed = async () => {
  try {
    await Product.deleteMany();

    for (const product of seedProducts) {
      const category = await Category.findOne({ name: product.categoryName }).lean();
      if (!category) {
        logger.error(`[SEED] Category ${product.categoryName} not found`);
        continue;
      }
      const customer = await Customer.findOne({ mail: product.createdBy }).lean();
      if (!customer) {
        logger.error(`[SEED] Customer ${product.createdBy} not found`);
        continue;
      }

      await Product.create({
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.status === "sold" ? 0 : 1,
        imagePublicId: product.imagePublicId,
        status: product.status,
        createdBy: customer._id,
        categoryId: category._id,
      });
    }
  } catch (error) {
    logger.error("[SEED] Error", error);
  }
};
