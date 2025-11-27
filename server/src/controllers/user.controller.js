import { User } from "../models/user.model.js";
import userService from "../services/user.service.js";

class UserController {
  async getAllUsers(req, res) {
    try {
      const users = await userService.getAllUsers();
      // if not found
      if (!users || users.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No users found",
        });
      }
      // if found -> return
      res.status(200).json({ success: true, data: users });
    } catch (error) {
      next(error);
    }
  }

  async getMyInfo(req, res) {
    const myId = req.user?.sub;
    if (!myId) return res.status(401).json({ success: false, message: "Unauthorized" });

    const myInfo = await userService.getMyInfo(myId);
    if (!myInfo) {
      return res.status(404).json({ success: false, message: "Not found" });
    }
    res.json({ success: true, data: myInfo });
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

  async updateMyInfo(req, res, next) {
    try {
      // const id = req.user.sub;
      const id = req.user?.sub;
      if (!id) return res.status(401).json({ success: false, message: "Unauthorized" });
      const data = req.body;
      // transfer the logic to the service
      const updateUser = await userService.updateMyInfo(id, data);
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

  async updateUser(req, res, next) {
    try {
      // check role
      const role = req.user?.role;
      if (role !== "admin") {
        return res.status(401).json({ success: false, message: "Unauthorized" });
      }

      const data = req.body;
      const { id } = req.params.id;
      // transfer the logic to the service
      const updateUser = await userService.updateUser(id, data);

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
      const id = req.user?.sub;
      if (!id) return res.status(401).json({ success: false, message: "Unauthorized" });
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
