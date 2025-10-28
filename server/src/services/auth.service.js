import { User } from "../models/user.model.js";
import { signToken } from "../utils/jwt.js";
import { AppError } from "../utils/AppError.js";
// import { use } from "react";

export const authService = {
  async register({ email, password }) {
    // YOUR CODE HERE
  },

  async login({ mail, password }) {
    const user = await User.findOne({mail}).select("+password");
    // check if the user not exists
    if(!user){
      throw new AppError("Invalid email or password", 401);
    }
    // compare password
    const isMatch = await user.comparePassword(password);
    if(!isMatch){
      throw new AppError("Invalid email or password", 401);
    }
    // if user has been locked
    if (user.status === "inactive") {
      throw new AppError("Your account has been locked.", 403);
    }
    // create JWT token
    const payload = {
      id: user._id,
      mail: user.mail,
      role: user.role,
    };
    const token = signToken(payload);
    // delete password before returning to the client
    user.password = undefined;
    // return user to the client
    return {token, user}
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
  async forgotPassword({ email }) {
    // YOUR CODE HERE
  },
};
