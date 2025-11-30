import { User } from "../models/user.model.js";
import { AppError } from "../utils/AppError.js";

export const AuthService = {
  async login(mail, password) {
    const user = await User.findOne({ mail });

    if (!user) {
      throw new AppError("Invalid email or password", 401);
    } else if (user.status === "inactive") {
      throw new AppError("Your account has locked", 400);
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      user.failedLoginAttempts += 1;

      if (user.failedLoginAttempts >= 3) user.status = "inactive";

      await user.save();
      throw new AppError("Invalid email or password", 401);
    }
    // reset failed login attempts
    if (user.failedLoginAttempts > 0) {
      user.failedLoginAttempts = 0;
      await user.save();
    }

    return { id: user._id, role: user.role };
  },

  async changePassword(userId, oldPassword, newPassword) {
    const user = await User.findById(userId);
    // check if the user not exists
    if (!user) {
      throw new AppError("User not found", 404);
    }
    // check if the currentPassword is not correct
    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) {
      throw new AppError("Incorrect current password", 401);
    }
    // set newPassword and save in database if the currentPassword is correct
    user.password = newPassword;
    await user.save();
  },
  async updatePassword(mail, newPassword) {
    const user = await User.findOne({ mail });
    // check if the user not exists
    if (!user) {
      throw new AppError("User not found", 404);
    }
    user.password = newPassword;
    await user.save();
  },
};
