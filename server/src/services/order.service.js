import mongoose from "mongoose";

import { Product } from "../models/product.model.js";
import { AppError } from "../utils/AppError.js";
import { User } from "../models/user.model.js";
import { Cart } from "../models/cart.model.js";
import { Order } from "../models/order.model.js";
import { ProviderService } from "./provider.service.js";

export const OrderService = {
  async create(userId, products, pickupAddress) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      // group product by createdBy
      const ordersBySeller = {};

      for (const product of products) {
        const sellerId = product.createdBy.toString();
        if (!ordersBySeller[sellerId]) {
          ordersBySeller[sellerId] = [];
        }
        ordersBySeller[sellerId].push(product);
      }

      // cal total price
      const sellerOrders = [];

      for (const sellerId in ordersBySeller) {
        const items = ordersBySeller[sellerId];

        const subtotal = items.reduce((sum, item) => sum + item.price, 0);

        const { providerId, shippingFee } = await ProviderService.calculateShippingFee(subtotal);

        sellerOrders.push({
          sellerId,
          items,
          subtotal,
          providerId,
          shippingFee,
        });
      }

      await session.commitTransaction();
      session.endSession();

      return;
    } catch (err) {
      await session.abortTransaction();
      session.endSession();
      throw err;
    }
  },

  async getOrdersByUserId(thisUserId) {
    const orders = await Order.find({ ownerId: thisUserId }).populate(
      "products.id",
      "name description price imagePublicId"
    );
    return orders;
  },

  async getAllOrders() {
    const orders = await Order.find().populate(
      "products.id",
      "name description price imagePublicId"
    );
    return orders;
  },
};
