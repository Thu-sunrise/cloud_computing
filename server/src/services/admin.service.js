import { User } from "../models/user.model.js";
import BaseService from "./base.service.js";
import userService from "./user.service.js";
import { Admin } from "../models/admin.model.js";

class AdminService extends BaseService {
  constructor() {
    super(Admin);
  }
  async updateAdmin(id, data) {
    return await userService.updateMyInfo(id, data);
  }

  async getAllAdmins(query, role) {
    return await super.getAll(query, role);
  }

  async getAllUsers(query, role) {
    return await userService.getAllUsers(query, role);
  }

  async deleteAdmin(id) {
    const result = await super.delete(id);
    return result;
  }

  async createAdmin(data) {
    return await super.create(data);
  }

  async getMyInfo(id) {
    return await super.getById(id);
  }

  async getAdminById(id) {
    return await userService.getUserById(id);
  }

  async updateUserById(id, data) {
    const allowedFields = ["role", "status", "failedLoginAttempts"];

    return await super.update(id, { $set: data }, allowedFields);
  }
}
export default new AdminService();
