import { User } from "../models/user.model.js";
import { Admin } from "../models/admin.model.js";
import adminService from "../services/admin.service.js";

class AdminController {
  async updateUserById(req, res, next) {
    try {
      // check role
      const role = req.user?.role;
      if (role !== "admin") {
        return res.status(401).json({ success: false, message: "Unauthorized" });
      }

      const data = req.body;
      const { id } = req.params.id;
      // transfer the logic to the service
      const updateUser = await adminService.updateUserById(id, data);

      return res.status(200).json({
        success: true,
        message: "Information updated successfully.",
        data: updateUser,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllAdmins(req, res, next) {
    try {
      // check role
      const role = req.user?.role;
      if (role !== "admin") {
        return res.status(401).json({ success: false, message: "Unauthorized" });
      }

      const data = await adminService.getAllAdmins(req.query, role);

      // if not found
      if (!data || data.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No users found",
        });
      }
      // if found -> return
      res.status(200).json({ success: true, data: data });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getAllUsers(req, res, next) {
    try {
      // check role
      const role = req.user.role;
      const data = await adminService.getAllUsers(req.query, role);
      // if not found
      if (!data || data.length === 0) {
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

  async getMyInfo(req, res, next) {
    try {
      const myId = req.user?.sub;
      if (!myId) return res.status(401).json({ success: false, message: "Unauthorized" });

      const myInfo = await adminService.getMyInfo(myId);

      if (!myInfo) {
        return res.status(404).json({ success: false, message: "Not found" });
      }

      res.json({ success: true, data: myInfo });
    } catch (error) {
      next(error);
    }
  }

  async getAdminById(req, res, next) {
    try {
      // transfer the logic to the service
      const user = await adminService.getAdminById(req.params.id);
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
      res.json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
  }

  async createAdmin(req, res, next) {
    try {
      // transfer the logic to the service
      const user = await adminService.createAdmin(req.body);
      res.json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
  }

  async updateAdmin(req, res, next) {
    try {
      // const id = req.user.sub;
      const id = req.user?.sub;
      if (!id) return res.status(401).json({ success: false, message: "Unauthorized" });
      const data = req.body;
      // transfer the logic to the service
      const updateUser = await adminService.updateAdmin(id, data);
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

  async deleteAdmin(req, res, next) {
    try {
      const id = req.user?.sub;
      console.log(id);
      if (!id) return res.status(401).json({ success: false, message: "Unauthorized" });
      // transfer the logic to the service
      const result = await adminService.deleteAdmin(id);

      return res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      next(error);
    }
  }
}
export default new AdminController();
