import { User } from "../models/user.model.js";
import { AppError } from "../utils/AppError.js";

class UserService {
  async getAllUsers() {
    const selectedFields = "mail name role avatar";
    return await User.find().select("-__v").select(selectedFields);
  }

  async getUserById(id) {
    const selectedFields = "mail name role avatar";
    return await User.findById(id).select("-__v").select(selectedFields);
  }

  async createUser(data) {
    return await User.create(data);
  }

  async updateUser(id, data) {
    // List of allowed fields to update
    const allowedFields = ["name", "avatar"];
    const updates = {};
    const requestFields = Object.keys(data);
    // Get allowed fields to update
    for (const field of requestFields) {
      if (allowedFields.includes(field)) {
        updates[field] = data[field];
      }
    }
    // The updated user object
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-password -__v");
    // Check if user not found
    if (!updatedUser) {
      throw new AppError("No user found with that ID", 404);
    }
    // Return
    return updatedUser;
  }

  async deleteUser(id) {
    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) {
      throw new AppError("No user found with that ID", 404);
    }
    return deleted;
  }
}

export default new UserService();
