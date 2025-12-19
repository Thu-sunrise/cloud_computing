import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    fromWalletId: {
      // FK
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wallet",
      required: true,
    },
    toWalletId: {
      // FK can be null for tranfer/withdrawal
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wallet",
    },
    orderId: {
      // FK can be null
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
    amount: {
      type: Number,
      required: true,
    },
    /*
     * Status can be:
     * - pending: funds are locked in escrow
     * - succeeded: funds have been successfully deposited/withdrawn
     * - released: funds have been released to the seller
     * - refunded: funds have been refunded to the buyer
     */
    status: {
      type: String,
      enum: ["pending", "succeeded", "released", "refunded"],
      default: "pending",
    },
    /**
     * Type can be:
     * - deposit: deposit to wallet
     * - withdrawal: withdrawal to external account
     * - refund: refund to buyer
     * - escrow: ...
     */
    type: {
      type: String,
      enum: ["deposit", "withdrawal", "refund", "escrow"],
      required: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Transaction = mongoose.model("Transaction", transactionSchema);
