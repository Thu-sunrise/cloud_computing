import mongoose from "mongoose";

const productHistorySchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    action: {
      type: String,
      enum: ["submit", "approve", "reject", "edit", "delete"],
    },
    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reason: {
      type: String, // reason for rejection or deletion
      default: "",
    },
  },
  { timestamps: true }
);

export const ProductHistory = mongoose.model("ProductHistory", productHistorySchema);
