import { User } from "../models/user.model.js";
import userService from "../services/user.service.js";

class UserController {
  async getAllUsers(req, res) {
    // transfer the logic to the service
    const users = await userService.getAllUsers();
    res.json({ success: true, data: users });
  }

  async getUserById(req, res) {
    // transfer the logic to the service
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.json({ success: true, data: user });
  }

  async createUser(req, res, next) {
    // transfer the logic to the service
    const user = await userService.createUser(req.body);
    res.json({ success: true, data: user });
  }

  async updateUser(req, res) {
    try {
      const { id } = req.user.id;
      const data = req.body;
      // transfer the logic to the service
      const updateUser = await userService.updateUser(id, data);
      // return
      return res.status(200).json({
        success: true,
        message: "Information updated successfully.",
        data: updateUser,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const { id } = req.user.id;
      // transfer the logic to the service
      const result = await userService.deleteUser(id);
      // delete cookie token session
      res.clearCookie("session", {
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      });
      // delete cookie token persistent
      res.clearCookie("persistent", {
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      });
      // return
      return res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
