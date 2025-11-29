import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    createdBy: {
      // FK
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    // categoryId: {
    //   // FK
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Category",
    //   required: true,
    // },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    salePrice: {
      type: Number,
      min: 0,
    },
    images: [
      {
        // publicId: {
        //   type: String,
        // },
        publicId: { type: String, required: true },
        url: { type: String, required: true },
        resource_type: { type: String, default: "image" },
      },
    ],
    status: {
      type: String,
      enum: ["active", "pending", "rejected", "deleted"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
