import { User } from "../models/user.model.js";
import { AppError } from "../utils/AppError.js";

export const UserService = {
  getUserByMail(mail) {
    const user = User.findOne({ mail }).select("-password");
    return user;
  },
};
