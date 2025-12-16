import { User } from "../models/user.model.js";
import { AppError } from "../utils/AppError.js";

export const UserService = {
  async getUserByMail(mail) {
    const user = await User.findOne({ mail }).select("-password");
    return user;
  },

  async getUserById(id) {
    const user = await User.findById(id);
    return user;
  },
};
