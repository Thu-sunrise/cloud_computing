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
    // console.log(product);
    const uid = product.createdBy;
    // console.log(uid);
    const cus = await User.findById(uid);
    // console.log(cus);
    return product;
  },

  // await Cart.updateMany(
  // { "products.id": { $in: [CCTV, Sony] } },
  // { $pull: { products: { id: { $in: [CCTV, Sony] } } } }
  //   );

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

  async createOrder(grouped, thisUserCart) {
    // Extracting Product IDs for setting status
    const allProductIds = [];
    Object.values(grouped).forEach((products) => {
      products.forEach((p) => allProductIds.push(p.productId));
    });
    await Product.updateMany(
      { _id: { $in: allProductIds }, status: "active" },
      { $set: { status: "ordered" } }
    );
    console.log(allProductIds);

    // create Order for each seller
    const orders = [];

    // const testOrder = await Order.create({
    //   products: [{ id: "69404c89af2f36ee1ee93295" }],
    //   status: "pending",
    //   notes: "test",
    // });
    // console.log(testOrder);

    for (const sellerId of Object.keys(grouped)) {
      const productsForSeller = grouped[sellerId];
      console.log(productsForSeller);
      console.log(productsForSeller.map((p) => ({ id: p.productId, type: typeof p.productId })));
      const newOrder = await Order.create({
        products: productsForSeller.map((p) => ({ id: p.productId.toString() })),
        status: "pending",
        // shipping: {
        //   deliveryAddress: "NEWYOrk",
        //   pickupAddress: "Shop Address",
        //   fee: 0,
        // },
        notes: "",
      });

      orders.push(newOrder);
      console.log(orders);
    }

    thisUserCart.products = [];
    await thisUserCart.save();
    console.log(thisUserCart);
    return orders;
  },
};
