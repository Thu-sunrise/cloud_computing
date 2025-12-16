import { Product } from "../models/product.model.js";
import { Customer } from "../models/customer.model.js";
import { Review } from "../models/review.model.js";

import seedReviews from "./data/review.json" with { type: "json" };
import { logger } from "../utils/logger.js";

export const seed = async () => {
  try {
    await Review.deleteMany();

    for (const review of seedReviews) {
      const owner = await Customer.findOne({ mail: review.productOwnerEmail }).lean();
      if (!owner) {
        logger.error(`[SEED] Customer ${review.productOwnerEmail} not found`);
        continue;
      }

      const product = await Product.findOne({
        name: review.productName,
        createdBy: owner._id,
      }).lean();

      if (!product) {
        logger.error(`[SEED] Product ${review.productName} not found`);
        continue;
      }

      const reviewer = await Customer.findOne({ mail: review.reviewerEmail }).lean();
      if (!reviewer) {
        logger.error(`[SEED] Customer ${review.reviewerEmail} not found`);
        continue;
      }

      await Review.create({
        reviewer: reviewer._id,
        productId: product._id,
        rating: review.rating,
        comment: review.comment,
      });
    }
  } catch (error) {
    logger.error("[SEED] Error", error);
  }
};
