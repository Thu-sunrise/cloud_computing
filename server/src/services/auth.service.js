import { User } from "../models/user.model.js";
import { AppError } from "../utils/AppError.js";

export const AuthService = {
  async checkExistedUser(mail) {
    const user = await User.findOne({ mail });
    return !!user;
  },

  async login({ mail, password }) {
    // YOUR CODE HERE
    // Check if User's already existed
    const user = await User.findOne({ mail: mail });

    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new AppError("Invalid email or password", 401);
    }

    return user;
  },

  async register({ mail, password }) {
    const newUser = new User({
      mail: mail,
      password: password,
    });
    await newUser.save();
    return newUser;
  },

  async updatePassword(mail, newPassword) {
    const user = await User.findOne({ mail });
    user.password = newPassword;
    await user.save();
    return user;
  },
};
