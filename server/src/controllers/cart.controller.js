import { asyncHandler } from "../utils/asyncHandler.js";
import { CartService } from "../services/cart.service.js";

export const getCart = asyncHandler(async (req, res) => {
  // Parse query params
  const userId = req.user.sub;
  const result = await CartService.getByUserId(userId);

  return res.status(200).json({
    message: "Get cart successfully",
    data: result,
  });
});

export const addToCart = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.sub;
  const result = await CartService.addToCart(userId, id);
  return res.status(200).json({
    message: "Add to cart successfully",
    data: result,
  });
});

export const removeFromCart = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.sub;

  const result = await CartService.remove(userId, id);
  return res.status(200).json({
    message: "Remove from cart successfully",
    data: result,
  });
});
