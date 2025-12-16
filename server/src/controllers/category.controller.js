import { asyncHandler } from "../utils/asyncHandler.js";
import { CategoryService } from "../services/category.service.js";

export const getListCategories = asyncHandler(async (req, res) => {
  const result = await CategoryService.getList();

  res.status(200).json({
    message: "Get list categories successfully",
    data: result,
  });
});

export const getTopSellingCategories = asyncHandler(async (req, res) => {
  const result = await CategoryService.getTopSelling();
  res.status(200).json({
    message: "Get top selling categories successfully",
    data: result,
  });
});
