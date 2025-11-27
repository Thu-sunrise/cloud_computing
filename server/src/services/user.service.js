import { User } from "../models/user.model.js";
import { AppError } from "../utils/AppError.js";

class UserService {
  async getAllUsers() {
    const selectedFields = "mail name role avatar";
    return await User.find().select(selectedFields);
  }

  async getMyInfo(id) {
    return await User.findById(id).select("-__v");
  }

  async getUserById(id) {
    const selectedFields = "mail name role avatar";
    return await User.findById(id).select(selectedFields);
  }

  async createUser(data) {
    return await User.create(data);
  }

  async updateMyInfo(id, data) {
    const allowedFields = ["name", "avatar"];

    // Validate fields
    for (const field of Object.keys(data)) {
      if (!allowedFields.includes(field)) {
        throw new AppError(`Field "${field}" is not allowed to update.`, 400);
      }
    }

    // Build update object
    const updateData = {};
    if (data.name) {
      if (data.name.firstName) updateData["name.firstName"] = data.name.firstName;
      if (data.name.lastName) updateData["name.lastName"] = data.name.lastName;
    }
    if (data.avatar) updateData.avatar = data.avatar;

    // Update without validation on other fields
    const user = await User.findByIdAndUpdate(
      id,
      { $set: updateData },
      {
        new: true, // return updated document
        runValidators: true, // validate only updated fields
        select: "-__v", // select fields to return
      }
    );

    if (!user) throw new AppError("User not found", 404);
    return user;
  }

  async updateUser(id, data) {
    const allowedFields = ["status", "role", "failedLoginAttempts"];

    const updateData = {};

    for (const field of Object.keys(data)) {
      if (allowedFields.includes(field)) {
        updateData[field] = data[field];
      } else {
        throw new AppError(`Field "${field}" is not allowed to update.`, 400);
      }
    }

    // Update without validation on other fields
    const user = await User.findByIdAndUpdate(
      id,
      { $set: updateData },
      {
        new: true,
        runValidators: true,
        select: "-__v",
      }
    );

    if (!user) throw new AppError("User not found", 404);
    return user;
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
