import { asyncHandler } from "../utils/asyncHandler.js";
import { WalletService } from "../services/wallet.service.js";

export const getWallet = asyncHandler(async (req, res) => {
  const userId = req.user.sub;
  const result = await WalletService.getByUserId(userId);

  res.status(200).json({ message: "Get wallet successfully", data: result });
});

export const updateWallet = asyncHandler(async (req, res) => {
  const userId = req.user.sub;
  const { amount } = req.body;
  const result = await WalletService.update(userId, amount);

  res.status(200).json({ message: "Update wallet successfully", data: result });
});
