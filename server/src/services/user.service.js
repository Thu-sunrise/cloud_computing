import { User } from "../models/user.model.js";
import { AppError } from "../utils/AppError.js";
import BaseService from "./base.service.js";

class UserService extends BaseService {
  constructor() {
    super(User);
  }
  async getAllUsers(query, role) {
    return await super.getAll(query, role);
  }

  async getMyInfo(id) {
    return await super.getById(id);
  }

  async getUserById(id) {
    const selectedFields = "mail name role avatar gender dateOfBirth phone";
    return await User.findById(id).select(selectedFields);
  }

  async createUser(data) {
    return await super.create(data);
  }

  async updateMyInfo(id, data) {
    const allowedFields = ["firstName", "lastName", "avatar", "mail"];

    // Update without validation on other fields
    return await super.update(id, data, allowedFields);
  }

  async deleteUser(id) {
    return await super.delete(id);
  }
}

export default new UserService();
