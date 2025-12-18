import mongoose from "mongoose";

import { Product } from "../models/product.model.js";
import { Cart } from "../models/cart.model.js";

import { CloudinaryService } from "./cloudinary.service.js";
import { AppError } from "../utils/AppError.js";

export const ProductService = {
  async getById(productId, user) {
    const product = await Product.findById(productId)
      .populate("createdBy", "name _id address avatarPublicId")
      .populate("categoryId", "name")
      .lean();

    if (!product) {
      throw new AppError("Product not found", 404);
    }

    if (user.role !== "admin") {
      // only admin can view status deleted
      if (product.status === "deleted") {
        throw new AppError("Product not found", 404);
      } // check owner and guest only view active product
      else if (product.createdBy.toString() !== user.id.toString() && product.status !== "active") {
        throw new AppError("Product not found", 404);
      }
    }

    product.imagePublicUrl = CloudinaryService.generateSignedUrl(product.imagePublicId);

    product.createdBy.avatarPublicUrl = CloudinaryService.generateSignedUrl(
      product.createdBy.avatarPublicId
    );

    // reshape category
    product.category = {
      _id: product.categoryId._id,
      name: product.categoryId.name,
    };

    delete product.categoryId; // remove old field

    return product;
  },

  async create(user, categoryId, name, description, price, image) {
    if (user.role === "admin") throw new AppError("Only customer can create product", 400);

    const uploadResult = await CloudinaryService.uploadFile(image, "images");

    const product = await Product.create({
      createdBy: user.id,
      categoryId: categoryId,
      name: name,
      description: description,
      price: price,
      imagePublicId: uploadResult.public_id,
    });

    return product;
  },

  async update(user, productId, payload, image = null) {
    const product = await Product.findById(productId).lean();

    if (!product) {
      throw new AppError("Product not found", 404);
    }
    if (product.createdBy.toString() !== user.id.toString()) {
      throw new AppError("Access denied", 403);
    }

    let updateData = {};

    if (payload.categoryId) updateData.categoryId = payload.categoryId;

    if (payload.name) updateData.name = payload.name;

    if (payload.description) updateData.description = payload.description;

    if (payload.price !== undefined) updateData.price = Number(payload.price);

    // update alway set status pending
    updateData.status = "pending";
    if (payload.status && (user === "service" || user.role === "admin")) {
      updateData.status = payload.status;
    }
    if (image) {
      const uploadResult = await CloudinaryService.uploadFile(image, "avatars");
      if (product.imagePublicId) {
        await CloudinaryService.deleteFile(product.imagePublicId);
      }
      updateData.imagePublicId = uploadResult.public_id;
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $set: updateData },
      {
        new: true,
        runValidators: true,
      }
    ).lean();

    // remove product all cart if product not active
    if (updatedProduct.status !== "active") {
      await Cart.updateMany(
        { "products.id": updatedProduct._id },
        { $pull: { products: { id: updatedProduct._id } } }
      );
    }

    return {
      ...updatedProduct,
      imagePublicUrl: CloudinaryService.generateSignedUrl(updatedProduct.imagePublicId),
    };
  },

  async delete(productId) {
    const product = await Product.findByIdAndDelete(productId);

    await CloudinaryService.deleteFile(product.imagePublicId);

    // remove product all cart
    await Cart.updateMany({ "products.id": productId }, { $pull: { products: { productId } } });
  },

  async getList(user, page, limit, search, categoryId) {
    const skip = (page - 1) * limit;

    const filter = {};

    // admin can view all status
    if (user.role !== "admin") {
      filter.status = "active";
    }
    // exclude own products
    if (user.id) {
      filter.createdBy = { $ne: new mongoose.Types.ObjectId(user.id) };
    }
    if (search) {
      filter.name = {
        $regex: search.trim(),
        $options: "i",
      };
    }
    if (categoryId) {
      filter.categoryId = new mongoose.Types.ObjectId(categoryId);
    }

    const [items, total] = await Promise.all([
      Product.find(filter)
        .populate("createdBy", "name _id address")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),

      Product.countDocuments(filter),
    ]);

    // attach url
    const data = items.map((product) => {
      return {
        ...product,
        imagePublicUrl: CloudinaryService.generateSignedUrl(product.imagePublicId),
        category: {
          _id: product.categoryId._id,
          name: product.categoryId.name,
        },
      };
    });

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  async getMyList(userId) {
    const products = await Product.find({
      createdBy: new mongoose.Types.ObjectId(userId),
      status: { $ne: "deleted" },
    })
      .populate("categoryId", "name")
      .sort({ createdAt: -1 })
      .lean();

    return products.map((product) => ({
      ...product,
      imagePublicUrl: CloudinaryService.generateSignedUrl(product.imagePublicId),
      category: {
        _id: product.categoryId._id,
        name: product.categoryId.name,
      },
    }));
  },
};
