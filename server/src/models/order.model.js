import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    products: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],
    status: {
      type: String,
      enum: ["created", "confirmed", "shipping", "completed", "cancelled", "refunded"],
      default: "pending",
    },
    shipping: {
      providerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DeliveryProvider",
      },
      pickupAddress: {
        type: String,
        required: true,
      },
      deliveryAddress: {
        type: String,
        required: true,
      },
      expectedDeliveryDate: {
        type: Date,
      },
      actualDeliveryDate: {
        type: Date,
      },
      fee: {
        type: Number,
        min: 0,
        default: 0,
      },
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
