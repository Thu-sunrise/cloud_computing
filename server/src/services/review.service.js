import { AppError } from "../utils/AppError.js";
import { Review } from "../models/review.model.js";
import { Customer } from "../models/customer.model.js";
import { Product } from "../models/product.model.js";
import mongoose from "mongoose";

export const ReviewService = {
  async create(reviewer, productId, rating, comment = null) {
    const user = await Customer.findById(reviewer).lean();
    if (!user) {
      throw new AppError("Customer not found", 404);
    }

    const product = await Product.findById(productId).lean();
    if (!product || product.status !== "sold") {
      throw new AppError("Product not found", 404);
    }

    if (rating < 1 || rating > 5) {
      throw new AppError("Rating must be a number between 1 and 5", 400);
    }
    const review = await Review.create({ reviewer, productId, rating, comment });
    return review;
  },
  async getList(userId) {
    const sellerId = new mongoose.Types.ObjectId(userId);

    const result = await Product.aggregate([
      // where createdBy = userId
      {
        $match: {
          createdBy: sellerId,
        },
      },
      // join review product
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "productId",
          as: "review",
        },
      },

      {
        $match: {
          "review.0": { $exists: true },
        },
      },

      {
        $unwind: "$review",
      },

      {
        $lookup: {
          from: "users",
          localField: "review.reviewer",
          foreignField: "_id",
          as: "reviewer",
        },
      },
      {
        $unwind: "$reviewer",
      },

      {
        $facet: {
          reviews: [
            {
              $project: {
                _id: "$review._id",
                rating: "$review.rating",
                comment: "$review.comment",
                createdAt: "$review.createdAt",

                product: {
                  _id: "$_id",
                  name: "$name",
                  price: "$price",
                },

                reviewer: {
                  _id: "$reviewer._id",
                  name: "$reviewer.name",
                  avatarPublicId: "$reviewer.avatarPublicId",
                },
              },
            },
            { $sort: { createdAt: -1 } },
          ],

          stats: [
            {
              $group: {
                _id: null,
                averageRating: { $avg: "$review.rating" },
                totalReviewCount: { $sum: 1 },
              },
            },
          ],
        },
      },
    ]);

    const reviews = result[0]?.reviews || [];
    const stats = result[0]?.stats[0] || {
      averageRating: 0,
      totalReviewCount: 0,
    };

    return {
      reviews,
      ...stats,
    };
  },
};
