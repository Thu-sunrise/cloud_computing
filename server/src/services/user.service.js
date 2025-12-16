import { User } from "../models/user.model.js";
import { AppError } from "../utils/AppError.js";

export const UserService = {
  async getById(id) {
    const user = await User.findById(id);
    if (!user) throw new AppError("User not found", 404);
    return user;
  },

  async getByMail(mail) {
    const user = await User.findOne({ mail: mail });
    return user;
  },

  async delete(id) {
    const user = await User.findByIdAndDelete(id);
    if (!user) throw new AppError("User not found", 404);
    return user;
  },
};
