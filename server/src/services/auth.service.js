import { User } from "../models/user.model.js";
import { AppError } from "../utils/AppError.js";

export const AuthService = {
  async checkExistedUser(mail) {
    const user = await User.findOne({ mail });
    return !!user;
  },

  async login({ mail, password }) {
    const user = await User.findOne({ mail }).select("+password");
    // check if the user not exists
    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }

    // if user has been locked
    if (user.status === "inactive") {
      throw new AppError("Your account has been locked.", 403);
    }

    // compare password
    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      user.failedLoginAttempts = user.failedLoginAttempts + 1;
      console.log(user.failedLoginAttempts);

      if (user.failedLoginAttempts >= 5) {
        user.status = "inactive";
        await user.save();
        throw new AppError(
          "Your account has been locked due to too many failed login attempts.",
          403
        );
      }

      await user.save();
      throw new AppError("Invalid email or password", 401);
    }
    // reset failed login attempts
    if (user.failedLoginAttempts > 0) {
      user.failedLoginAttempts = 0;
      await user.save();
    }
    return user;
  },

  async changePassword({ userId, currentPassword, newPassword }) {
    const user = await User.findById(userId).select("+password");
    // check if the user not exists
    if (!user) {
      throw new AppError("User not found", 404);
    }
    // check if the currentPassword is not correct
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      throw new AppError("Incorrect current password", 401);
    }
    // set newPassword and save in database if the currentPassword is correct
    user.password = newPassword;
    await user.save();
  },
};
