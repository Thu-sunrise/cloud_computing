import { asyncHandler } from "../utils/asyncHandler.js";
import { AdminService } from "../services/admin.service.js";

export const updateUserById = asyncHandler(async (req, res) => {
  // check role
  const role = req.user?.role;
  if (role !== "admin") {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const data = req.body;
  const { id } = req.params.id;
  // transfer the logic to the service
  const updateUser = await AdminService.updateUserById(id, data);

  return res.status(200).json({
    success: true,
    message: "Information updated successfully.",
    data: updateUser,
  });
});

export const getAllAdmins = asyncHandler(async (req, res) => {
  // check role
  const role = req.user?.role;
  if (role !== "admin") {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const data = await AdminService.getAllAdmins(req.query);

  // if not found
  if (!data || data.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No users found",
    });
  }
  // if found -> return
  res.status(200).json({ success: true, data: data });
});

export const createAdmin = asyncHandler(async (req, res) => {
  // transfer the logic to the service
  const user = await AdminService.createAdmin(req.body);
  res.json({ success: true, data: user });
});

export const deleteAdmin = asyncHandler(async (req, res) => {
  const id = req.user?.sub;
  console.log(id);
  if (!id) return res.status(401).json({ success: false, message: "Unauthorized" });
  // transfer the logic to the service
  const result = await AdminService.deleteAdmin(id);

  return res.status(200).json({
    success: true,
    message: result.message,
  });
});
