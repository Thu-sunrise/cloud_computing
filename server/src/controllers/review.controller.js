import { asyncHandler } from "../utils/asyncHandler.js";
import { ReviewService } from "../services/review.service.js";

export const getListReviews = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await ReviewService.getList(id);
  res.status(200).json({
    message: "Get list reviews successfully",
    data: result,
  });
});

export const createReview = asyncHandler(async (req, res) => {
  const { productId, rating, comment } = req.body;
  const reviewer = req.user.sub;
  const result = await ReviewService.create(reviewer, productId, Number(rating), comment);
  res.json({
    message: "Created review successfully",
    data: result,
  });
});
