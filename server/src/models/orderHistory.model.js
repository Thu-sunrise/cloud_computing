import mongoose from "mongoose";

const orderHistorySchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    action: {
      type: String,
      enum: ["created", "confirmed", "shipping", "completed", "cancelled", "refunded"],
    },
    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

export const OrderHistory = mongoose.model("OrderHistory", orderHistorySchema);
