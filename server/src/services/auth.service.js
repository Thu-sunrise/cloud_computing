import { User } from "../models/user.model.js";
import { AppError } from "../utils/AppError.js";

export const AuthService = {
  async register({ mail, password }) {
    // YOUR CODE HERE
  },
  async login({ mail, password }) {
    // YOUR CODE HERE
  },
  async changePassword({ userId, currentPassword, newPassword }) {
    // YOUR CODE HERE
  },
  async forgotPassword({ mail }) {
    // YOUR CODE HERE
  },
};
