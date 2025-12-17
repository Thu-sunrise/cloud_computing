import { asyncHandler } from "../utils/asyncHandler.js";
import { UserService } from "../services/user.service.js";

export const getUser = asyncHandler(async (req, res) => {
  const userId = req.user.sub;
  const result = await UserService.getById(userId);

  res.status(200).json({ message: "Get user successfully", data: result });
});
