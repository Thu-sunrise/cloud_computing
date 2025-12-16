import { Product } from "../models/product.model.js";
import { AppError } from "../utils/AppError.js";
import { User } from "../models/user.model.js";
import { Cart } from "../models/cart.model.js";
import { Order } from "../models/order.model.js";

export const OrderService = {
  async getProductById(id) {
    const product = await Product.findById(id).populate("createdBy", "name _id");
    if (!product) {
      throw new AppError("Product not found", 404);
    }
    const uid = product.createdBy;
    const cus = await User.findById(uid);
    return product;
  },

  async groupProductsBySeller(products) {
    const grouped = {};

    products.forEach((p) => {
      const sellerId = p.id.createdBy.toString();
      if (!grouped[sellerId]) {
        grouped[sellerId] = [];
      }
      grouped[sellerId].push({
        productId: p.id._id,
        name: p.id.name,
        price: p.id.price,
        description: p.id.description,
        imagePublicId: p.id.imagePublicId,
        images: p.id.images,
      });
    });

    return grouped;
  },

  async createOrder(
    grouped,
    thisUserCart,
    providerId,
    pickupAddress,
    deliveryAddress,
    expectedDeliveryDate,
    actualDeliveryDate,
    thisUserId
  ) {
    // Extracting Product IDs for setting status

    const allProductIds = [];
    Object.values(grouped).forEach((products) => {
      products.forEach((p) => allProductIds.push(p.productId));
    });
    await Product.updateMany(
      { _id: { $in: allProductIds }, status: "active" },
      { $set: { status: "sold" } }
    );

    // create Order for each seller
    const orders = [];
    for (const sellerId of Object.keys(grouped)) {
      const productsForSeller = grouped[sellerId];
      const newOrder = await Order.create({
        ownerId: thisUserId,
        shipping: {
          providerId,
          pickupAddress,
          deliveryAddress,
          expectedDeliveryDate,
          actualDeliveryDate,
        },
        products: productsForSeller.map((p) => ({ id: p.productId.toString() })),
        status: "pending",
      });
      orders.push(newOrder);
    }

    thisUserCart.products = [];
    await thisUserCart.save();

    return orders;
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
