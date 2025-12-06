import { asyncHandler } from "../utils/asyncHandler.js";
import { ReviewService } from "../services/review.service.js";
import { AppError } from "../utils/AppError.js";

export const getReviewsOfProduct = asyncHandler(async (req, res) => {
  const { id } = await req.params;
  const data = await ReviewService.getReviewsOfProduct(id, req.query);
  // if not found
  if (!data || data.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No reviews found",
    });
  }
  // if found -> return
  res.status(200).json({ success: true, data: data });
});

export const createReviewToProduct = asyncHandler(async (req, res) => {
  const reviewer = req.user.id;
  const { rating, comment } = req.body;
  const productId = req.params;
  const data = await ReviewService.createReview(reviewer, productId, rating, comment);
  res.json({ success: true, data: data });
});

export const deleteReview = asyncHandler(async (req, res) => {
  if (req.user.id !== req.params || req.user.role !== "admin") {
    throw new AppError("Forbidden", 403);
  }
  // transfer the logic to the service
  const result = await ReviewService.deleteReview();
  // return
  return res.status(200).json({
    success: true,
    message: result.message,
  });
});

export const updateReviewById = asyncHandler(async (req, res) => {
  // check role
  const data = req.body;
  const { id } = req.params;
  // transfer the logic to the service
  const updateUser = await ReviewService.updateReview(id, data);

  return res.status(200).json({
    success: true,
    message: "Information updated successfully.",
    data: updateUser,
  });
});
