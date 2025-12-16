import { asyncHandler } from "../utils/asyncHandler.js";
import { CartService } from "../services/cart.service.js";
import { ProductService } from "../services/product.service.js";
import { UserService } from "../services/user.service.js";
import { OrderService } from "../services/order.service.js";

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

export const createOrder = asyncHandler(async (req, res) => {
  const thisUserId = req.user.sub;
  const thisUserCart = await CartService.getCart(thisUserId);
  if (!thisUserCart || thisUserCart.products.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  const group = await OrderService.groupProductsBySeller(thisUserCart.products);

  const orders = await OrderService.createOrder(group, thisUserCart);
  return res.status(200).json({ data: orders });
});

export const getOrderHistory = asyncHandler(async (req, res) => {});

export const getOrderList = asyncHandler(async (req, res) => {});
