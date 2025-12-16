import { asyncHandler } from "../utils/asyncHandler.js";
import { CartService } from "../services/cart.service.js";
import { ProductService } from "../services/product.service.js";
import { UserService } from "../services/user.service.js";

export const getCart = asyncHandler(async (req, res) => {
  // Parse query params
  const thisUserId = req.user.sub;
  const cart = await CartService.getCart(thisUserId);
  const cartTotal = await CartService.cartTotal(cart);
  if (!cart) {
    return res.status(200).json({ data: {}, total: 0, count: 0 });
  }
  return res.status(200).json({ data: cart, total: cartTotal.total, count: cartTotal.count });
});

export const addToCart = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const ownerDoc = req.user;
  // Extract User info
  const customerId = ownerDoc.sub;
  const user = await UserService.getUserById(customerId);
  if (!user) return res.status(404).json({ message: "No specified User found." });

  // Add products to user's cart
  const cart = await CartService.addToCart(customerId, productId);
  return res.status(200).json({ data: cart });
});

export const removeOne = asyncHandler(async (req, res) => {
  const thisUserId = req.user.sub;
  console.log(thisUserId);
  const { productId } = req.params;
  const cart = await CartService.removeOne(thisUserId, productId);
  if (cart) return res.status(200).json({ data: cart });
  return res.status(404).json({ message: "no cart found" });
});
