import { User } from "../models/user.model.js";
import { AppError } from "../utils/AppError.js";

export const AuthService = {
  async checkExistedUser(mail) {
    // Check if User's already existed
    const existingUser = await User.findOne({ mail });
    return existingUser;
  },
  async register({ mail, password }) {
    const newUser = new User({
      mail: mail,
      password: password,
    });
    newUser.save();
    return newUser;
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
  async changePassword({ userId, currentPassword, newPassword }) {
    // YOUR CODE HERE
  },
  async forgotPassword({ mail, newpassword }) {
    const user = await User.findOne({ mail: mail });

    // Change password
    user.password = newpassword;
    await user.save();
    return user;
  },
};
