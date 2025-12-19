import moongoose from "mongoose";

const walletSchema = new moongoose.Schema({
  userId: {
    type: moongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  balance: {
    type: Number,
    default: 0,
    min: 0,
  },
  // future implementation
  // paymentMethods: [
  //   {
  //     type: {
  //       type: String,
  //       enum: ["credit_card", "paypal", "bank_transfer"],
  //       required: true,
  //     },
  //     bankName: String,
  //     isDefault: {
  //       type: Boolean,
  //       default: false,
  //     },
  //   },
  // ],
});

export const Wallet = moongoose.model("Wallet", walletSchema);
