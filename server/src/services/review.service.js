import { AppError } from "../utils/AppError.js";
import { Review } from "../models/review.model.js";
import { User } from "../models/user.model.js";
import { Product } from "../models/product.model.js";
import mongoose from "mongoose";

export const ReviewService = {
  async createReview(reviewer, productId, rating, comment = null) {
    // validate MongoDB ObjectIds for reviewer and product
    if (!mongoose.Types.ObjectId.isValid(reviewer)) {
      throw new AppError("Invalid reviewer id", 400);
    }
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      throw new AppError("Invalid product id", 400);
    }

    // check if the user and product exists in the database
    const user = await User.findById(reviewer).lean();
    if (!user) {
      throw new AppError("User not found", 404);
    }

    const product = await Product.findById(productId).lean();
    if (!product) {
      throw new AppError("Product not found", 404);
    }

    // validate rating: must be a number between 1 and 5
    const nRating = Number(rating);
    if (!Number.isFinite(nRating) || nRating < 1 || nRating > 5) {
      throw new AppError("Rating must be a number between 1 and 5", 400);
    }

    // prevent duplicate review from same user for same product
    const exist = await Review.findOne({ reviewer, productId }).lean();
    if (exist) {
      throw new AppError("User already reviewed this product", 409);
    }

    const review = await Review.create({ reviewer, productId, rating: nRating, comment });
    return review;
  },

  async deleteReview(reviewId, currentUserId = null, currentUserRole = null) {
    // validate review ID format
    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
      throw new AppError("Invalid review id", 400);
    }

    // find the review to ensure it exists before deleting
    const review = await Review.findById(reviewId);
    if (!review) {
      throw new AppError("Review not found", 404);
    }

    // delete review and return the deleted document
    const deleted = await Review.findByIdAndDelete(reviewId).lean();
    if (!deleted) throw new AppError("No document found with that ID", 404);
    return deleted;
  },

  async getReviewsOfProduct(productId, query) {
    // Validate product ID
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      throw new AppError("Invalid product id", 400);
    }

    // Destructure query parameters with default values
    const { page = 1, limit = 10, sort = "-createdAt", search, rating } = query;

    // Calculate pagination values (skip and limit)
    const pageNumber = Math.max(1, parseInt(page) || 1);
    const limitNumber = Math.max(1, Math.min(100, parseInt(limit) || 10));
    const skip = (pageNumber - 1) * limitNumber;

    // Build aggregation pipeline to allow searching by reviewer name
    const match = { productId: new mongoose.Types.ObjectId(productId) };

    // Add rating filter if provided
    if (rating) match.rating = Number(rating);

    // Define the base pipeline: Match -> Lookup User -> Unwind User array
    const pipeline = [
      { $match: match },
      {
        $lookup: {
          from: "users",
          localField: "reviewer",
          foreignField: "_id",
          as: "reviewer",
        },
      },
      { $unwind: "$reviewer" },
    ];

    // Add search condition if 'search' query exists (searching by first or last name)
    if (search && String(search).trim().length > 0) {
      const s = String(search).slice(0, 100);
      pipeline.push({
        $match: {
          $or: [
            { "reviewer.name.firstName": { $regex: s, $options: "i" } },
            { "reviewer.name.lastName": { $regex: s, $options: "i" } },
          ],
        },
      });
    }

    // Handle sorting logic
    const sortStage = { $sort: {} };
    if (typeof sort === "string") {
      const direction = sort.startsWith("-") ? -1 : 1;
      const field = sort.replace(/^-/, "");
      sortStage.$sort[field] = direction;
    } else {
      sortStage.$sort = { createdAt: -1 };
    }

    // Select specific fields to return
    const projectStage = {
      $project: {
        reviewer: {
          _id: "$reviewer._id",
          name: {
            firstName: "$reviewer.name.firstName",
            lastName: "$reviewer.name.lastName",
          },
        },
        rating: 1,
        comment: 1,
        createdAt: 1,
      },
    };

    // pipeline for items
    const itemsPipeline = [
      ...pipeline,
      projectStage,
      sortStage,
      { $skip: skip },
      { $limit: limitNumber },
    ];

    // pipeline for count
    const countPipeline = [...pipeline, { $count: "total" }];

    // Execute both queries in parallel using Promise.all
    const [items, countResult] = await Promise.all([
      Review.aggregate(itemsPipeline),
      Review.aggregate(countPipeline),
    ]);

    // Extract total count safely
    const total = countResult.length > 0 ? countResult[0].total : 0;

    return {
      page: pageNumber,
      limit: limitNumber,
      total,
      totalPages: Math.ceil(total / limitNumber),
      items,
    };
  },

  /*
    ------------------------------------------------------------------------
    -------------PHAN NAY MINH THU CHUA TEST -> NE NO RA NHA----------------
    ------------------------------------------------------------------------
  */

  async getReviewsAllMyProducts(currentUserId, query) {
    // Validate user ID
    if (!mongoose.Types.ObjectId.isValid(currentUserId)) {
      throw new AppError("Invalid user id", 400);
    }

    // Destructure query parameters with default values
    const { page = 1, limit = 10, sort = "-createdAt", rating } = query;

    // Calculate pagination values (skip and limit)
    const pageNumber = Math.max(1, parseInt(page) || 1);
    const limitNumber = Math.max(1, Math.min(100, parseInt(limit) || 10));
    const skip = (pageNumber - 1) * limitNumber;

    const pipeline = [
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "productInfo",
        },
      },
      { $unwind: "$productInfo" },

      // Filter reviews where product.createdBy matches currentUserId
      {
        $match: {
          "productInfo.createdBy": new mongoose.Types.ObjectId(currentUserId),
        },
      },
    ];

    // Filter by rating if requested
    if (rating) {
      pipeline.push({ $match: { rating: Number(rating) } });
    }

    // Lookup reviewer details
    pipeline.push(
      {
        $lookup: {
          from: "users",
          localField: "reviewer",
          foreignField: "_id",
          as: "reviewer",
        },
      },
      { $unwind: "$reviewer" }
    );

    // sort
    const sortStage = { $sort: {} };
    if (typeof sort === "string") {
      const direction = sort.startsWith("-") ? -1 : 1;
      const field = sort.replace(/^-/, "");
      sortStage.$sort[field] = direction;
    } else {
      sortStage.$sort = { createdAt: -1 };
    }

    // Select specific fields to return
    const projectStage = {
      $project: {
        _id: 1,
        rating: 1,
        comment: 1,
        createdAt: 1,
        reviewer: {
          _id: "$reviewer._id",
          name: {
            firstName: "$reviewer.name.firstName",
            lastName: "$reviewer.name.lastName",
          },
        },

        product: {
          _id: "$productInfo._id",
          name: "$productInfo.name",
        },
      },
    };

    // Finalize pipelines
    const itemsPipeline = [
      ...pipeline,
      projectStage,
      sortStage,
      { $skip: skip },
      { $limit: limitNumber },
    ];

    const countPipeline = [...pipeline, { $count: "total" }];

    const [items, countResult] = await Promise.all([
      Review.aggregate(itemsPipeline),
      Review.aggregate(countPipeline),
    ]);

    const total = countResult.length > 0 ? countResult[0].total : 0;

    return {
      page: pageNumber,
      limit: limitNumber,
      total,
      totalPages: Math.ceil(total / limitNumber),
      items,
    };
  },
};
