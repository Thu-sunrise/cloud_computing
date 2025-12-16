import { removeOne } from "../controllers/cart.controller.js";
import { Cart } from "../models/cart.model.js";
import { Product } from "../models/product.model.js";
import { AppError } from "../utils/AppError.js";

export const CartService = {
  async addToCart(customerId, productId) {
    let cart = await Cart.findOne({ customerId: customerId });
    const product = await Product.findById(productId);
    if (!product) throw new AppError("Product not found", 404);
    else if (!(product.status === "active")) throw new AppError("Product is not available", 400);

    // Check owner product
    if (customerId.toString() === product.createdBy.toString()) {
      throw new AppError("Cannot add your own product", 400);
    }

    if (!cart) {
      cart = await Cart.create({
        customerId,
        products: [{ id: productId }],
      });
      return cart;
    }

    // Check trung
    const exists = cart.products.some((item) => item.id.toString() === productId.toString());
    if (exists) {
      throw new AppError("Product already in cart", 400);
    }

    cart.products.push({ id: productId });
    for (const x of cart.products) {
      console.log(x);
    }
    cart.save();
    return cart;
  },

  async getCart(thisUserId) {
    const cart = await Cart.findOne({ customerId: thisUserId }).populate(
      "products.id",
      "name description price imagePublicId images createdBy"
    );
    return cart;
  },

  async removeOne(thisUserId, productId) {
    const cart = await Cart.findOne({ customerId: thisUserId });
    if (!cart) return null;
    // Check product in cart
    const exists = cart.products.some((item) => item.id._id.toString() === productId.toString());
    if (!exists) {
      throw new AppError("Product not in cart", 404);
    }

    // Remove product
    cart.products = cart.products.filter((item) => item.id._id.toString() !== productId.toString());

    await cart.save();
    return cart;
  },

  async cartTotal(cart) {
    if (!cart) return 0;
    let total = 0;
    let count = 0;
    for (const item of cart.products) {
      const product = item.id;
      if (product.salePrice) {
        total += product.salePrice;
      } else {
        total += product.price;
      }
      count += 1;
    }
    return { total, count };
  },
};
