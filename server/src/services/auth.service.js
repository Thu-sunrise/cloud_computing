import { User } from "../models/user.model.js";
import { AppError } from "../utils/AppError.js";

export const AuthService = {
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
    if (await user.comparePassword(password)) {
      user.failedLoginAttempts = user.failedLoginAttempts + 1;

      if (user.failedLoginAttempts >= 5) {
        user.status = "inactive";
      }

      await user.save();
      throw new AppError("Invalid email or password", 401);
    }

    // reset failed login attempts
    if (user.failedLoginAttempts > 0) {
      user.failedLoginAttempts = 0;
      await user.save();
    }
  },
};
