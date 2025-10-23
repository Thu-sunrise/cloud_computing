import { User } from "../models/user.model.js";
import { signToken } from "../utils/jwt.js";
import { AppError } from "../utils/AppError.js";

export const authService = {
  async register({ email, password }) {
    // YOUR CODE HERE
  },
  async login({ email, password }) {
    // YOUR CODE HERE
  },
  async changePassword({ userId, currentPassword, newPassword }) {
    // YOUR CODE HERE
  },
  async forgotPassword({ email }) {
    // YOUR CODE HERE
  },
};
