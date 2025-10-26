import { asyncHandler } from "../utils/asyncHandler.js";
import { authService } from "../services/auth.service.js";
import { env } from "../config/env.js";
import { AppError } from "../utils/AppError.js";
import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

export const register = asyncHandler(async (req, res) => {
  // YOUR CODE HERE
  // const newUser = await new User({
  //   mail: req.body.mail,
  //   password: req.body.password,
  // });

  // //save to db
  // const user = await newUser.save();
  // user.password = undefined;
  // res.status(200).json(user);
});

export const login = asyncHandler(async (req, res) => {
  const mail = req.body.mail;
  const password = req.body.password;
  // check validate input
  if (!mail || !password){
    throw new AppError("Email and password are required", 400);
  }
  // transfer the logic to the service
  const {token, user} = await authService.login({
    mail: mail, 
    password: password});
  // set cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 1000*60*60*24*7,
    path: "/"
  });
  // send response
  res.status(200).json({
    message: "Login successful",
    data: {
      user,
    },
  });
});

export const changePassword = asyncHandler(async (req, res) => {
  const currentPassword = req.body.currentPassword;
  const newPassword = req.body.newPassword;
  // get information from token
  const userId = req.user.id;
  // DEBUG CONTROLLER
  console.log("debug controller")
  console.log(currentPassword);
  console.log(newPassword);
  console.log(userId);
  // END DEBUG

  // check validate input
  if (!currentPassword || !newPassword){
    throw new AppError("Current Password and New Password are required", 400);
  }
  if (currentPassword === newPassword){
    throw new AppError("New password must be different from the current password", 400);
  }
  // transfer the logic to the service
  await authService.changePassword({userId, currentPassword, newPassword});
  // delete cookie token
  res.clearCookie("token", {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/"
  });
  // send response
  res.status(200).json({
    message: "Password changed successfully. Please log in again.",
  });
});

export const forgotPassword = asyncHandler(async (req, res) => {
  // YOUR CODE HERE
});
