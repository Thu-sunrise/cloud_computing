import { Wallet } from "../models/wallet.model.js";
import { AppError } from "../utils/AppError.js";

export const WalletService = {
  async getByUserId(userId) {
    const wallet = await Wallet.findOne({ userId: userId }).lean();
    return wallet;
  },

  async create(userId) {
    const wallet = await Wallet.create({ userId: userId });
    return wallet;
  },

  async update(userId, amount) {
    const wallet = await Wallet.findOne({ userId: userId });
    if (!wallet) throw new AppError("Wallet not found", 404);

    wallet.balance += amount;

    if (wallet.balance < 0)
      throw new AppError("Balance is insufficient to complete the transaction.", 400);
    wallet.save();

    return wallet;
  },
};
