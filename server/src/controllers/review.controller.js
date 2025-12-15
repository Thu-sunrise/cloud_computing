import { asyncHandler } from "../utils/asyncHandler.js";
import { ReviewService } from "../services/review.service.js";
import { AppError } from "../utils/AppError.js";

/*
  Get all reviews written by others for one product of user
*/
export const getReviewsOfProduct = asyncHandler(async (req, res) => {
  const { id } = await req.params;
  const data = await ReviewService.getReviewsOfProduct(id, req.query);
  // if not found
  if (!data || data.items.length === 0) {
    return res.status(404).json({ success: false, message: "No reviews found" });
  }
  // if found -> return
  res.status(200).json({ success: true, data: data });
});

/*
  create review
*/
export const createReviewToProduct = asyncHandler(async (req, res) => {
  const reviewer = await req.user.sub;
  const { rating, comment } = await req.body;
  const { id: productId } = await req.params;
  const data = await ReviewService.createReview(reviewer, productId, rating, comment);
  res.json({ success: true, data: data });
});

/*
  delete review (just only admin can delete)
*/
export const deleteReview = asyncHandler(async (req, res) => {
  if (req.user.sub !== req.params && req.user.role !== "admin") {
    throw new AppError("Forbidden", 403);
  }
  const { id: reviewId } = await req.params;

  // transfer the logic to the service
  const result = await ReviewService.deleteReview(reviewId);
  // return
  return res.status(200).json({
    success: true,
    message: result.message,
  });
});

/*
    ------------------------------------------------------------------------
    -------------PHAN NAY MINH THU CHUA TEST -> NE NO RA NHA----------------
    ------------------------------------------------------------------------
  */

/*
  Get all reviews written by others for the current user's products.
*/
export const getReviewsAllMyProducts = asyncHandler(async (req, res) => {
  const { userId } = await req.params;
  const data = await ReviewService.getReviewsAllMyProducts(userId, req.query);
  // if not found
  if (!data || data.items.length === 0) {
    return res.status(404).json({ success: false, message: "No reviews found" });
  }
  // if found -> return
  res.status(200).json({ success: true, data: data });
});
