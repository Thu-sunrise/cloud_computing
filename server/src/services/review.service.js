import { AppError } from "../utils/AppError.js";
import { Review } from "../models/review.model.js";
import { User } from "../models/user.model.js";
import mongoose from "mongoose";

export const ReviewService = {
  async createReview(reviewer, productId, rating, comment = null) {
    const user = await User.findById(reviewer);
    if (!user) {
      throw new AppError("User not found", 401);
    }
    const review = await Review.create({ reviewer, productId, rating, comment });
    return review;
  },

  async deleteReview(reviewId) {
    const review = await Review.findById(reviewId);
    if (!review) {
      throw new AppError("review not found", 401);
    }
    const reviewDelete = await Review.findByIdAndDelete(reviewId);
    if (!reviewDelete) throw new AppError("No document found with that ID", 404);
    return reviewDelete;
  },

  async updateReview(reviewId, data) {
    const review = await Review.findById(reviewId);
    if (!review) {
      throw new AppError("review not found", 401);
    }
    const reviewUpdate = await Review.findByIdAndUpdate(
      reviewId,
      { $set: data },
      { new: true, runValidators: true }
    );
    if (!reviewUpdate) throw new AppError("No document found with that ID", 404);
    return reviewUpdate;
  },

  async getReviewsOfProduct(productId, query) {
    const searchFields = ["name.firstName", "name.lastName"];
    const { page = 1, limit = 10, sort = "-createdAt", search, rating, ...filter } = query;

    filter.productId = productId;

    if (rating) {
      filter.rating = Number(rating);
    }

    if (search) {
      filter.$or = searchFields.map((field) => ({
        [field]: { $regex: search, $options: "i" },
      }));
    }
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const skip = (pageNumber - 1) * limitNumber;

    const [items, total] = await Promise.all([
      Review.find(filter).sort(sort).skip(skip).limit(limitNumber),
      Review.countDocuments(filter),
    ]);

    return {
      page: pageNumber,
      limit: limitNumber,
      total,
      totalPages: Math.ceil(total / limitNumber),
      items,
    };
  },
};
