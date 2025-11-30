import { asyncHandler } from "../utils/asyncHandler.js";
import { AdminService } from "../services/admin.service.js";

export const getAllAdmins = asyncHandler(async (req, res) => {
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
