import { asyncHandler } from "../utils/asyncHandler.js";
import { CartService } from "../services/cart.service.js";
import { ProductService } from "../services/product.service.js";
import { UserService } from "../services/user.service.js";
import { OrderService } from "../services/order.service.js";

export const createOrder = asyncHandler(async (req, res) => {
  const userId = req.user.sub;
  // products is array:
  // [{id: ..., createdBy: ..., price: ..., address:...},...] (address of createdBy)
  const { products, pickupAddress } = req.body;

  const result = await OrderService.create(userId, products, pickupAddress);

  return res.status(200).json({
    message: "Create order successfully",
    data: result,
  });
});

export const getOrderHistory = asyncHandler(async (req, res) => {
  const thisUserId = req.user.sub;

  const orders = await OrderService.getOrdersByUserId(thisUserId);

  return res.status(200).json({ data: orders });
});

export const getOrderList = asyncHandler(async (req, res) => {
  const orders = await OrderService.getAllOrders();
  return res.status(200).json({ data: orders });
});
