import { Product } from "../models/product.model.js";
import { AppError } from "../utils/AppError.js";

export const ProductService = {
  async getProductById(id) {
    const product = await Product.findById(id);
    if (!product) {
      throw new AppError("Product not found", 404);
    }
    return product;
  },

  async createProduct({ createdBy, name, description, price, salePrice, images }) {
    const newProduct = new Product({
      createdBy,
      name,
      description,
      price,
      salePrice,
      images,
    });
    await newProduct.save();
    return newProduct;
  },

  async updateProduct(product, { name, description, price, salePrice, images }) {
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price !== undefined ? price : product.price;
    product.salePrice = salePrice !== undefined ? salePrice : product.salePrice;
    product.images = images;
    await product.save();
    return product;
  },

  async deleteProduct(id) {
    const deletedProduct = await Product.findByIdAndDelete(id);
    return deletedProduct;
  },

  async countTotalProduct(query) {
    return Product.countDocuments(query);
  },

  async pagingTotalProduct(query, sortOrder, skip, limit) {
    return Product.find(query).sort({ price: sortOrder }).skip(skip).limit(limit);
  },
};
