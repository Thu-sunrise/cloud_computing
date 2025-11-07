import { User } from "../models/user.model.js";
import { AppError } from "../utils/AppError.js";
// import { use } from "react";

export const AuthService = {
  async register({ mail, password }) {
    // YOUR CODE HERE
  },

  async login({ mail, password }) {
    const user = await User.findOne({mail}).select("+password");
    console.log(user);
    // check if the user not exists
    if(!user){
      throw new AppError("Invalid email or password", 401);
    }
    // compare password
    const isMatch = await user.comparePassword(password);

    if(!isMatch){
      user.failedLoginAttempts = (user.failedLoginAttempts || 0) + 1;
      if (user.failedLoginAttempts >= 5 && user.status === "active") {
        user.status = "inactive";
      }
      await user.save();
      throw new AppError("Invalid email or password", 401);
    }
    // if user has been locked
    if (user.status === "inactive") {
      throw new AppError("Your account has been locked.", 403);
    }
    // reset failed login attempts
    if (user.failedLoginAttempts > 0){
      user.failedLoginAttempts = 0;
      await user.save();
    }
    // delete password before returning to the client
    user.password = undefined;
    // return user to the client
    return user;
  },

  async changePassword({ userId, currentPassword, newPassword }) {
    const user = await User.findById(userId).select("+password");
    // check if the user not exists
    if (!user){
      throw new AppError("User not found", 404);
    }
    // check if the currentPassword is not correct
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch){
      throw new AppError("Incorrect current password", 401);
    }
    // set newPassword and save in database if the currentPassword is correct
    user.password = newPassword;
    await user.save();
  },
  async forgotPassword({ mail }) {
    // YOUR CODE HERE
  },
};
