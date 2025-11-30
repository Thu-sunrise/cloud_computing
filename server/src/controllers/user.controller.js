import { asyncHandler } from "../utils/asyncHandler.js";
import { UserService } from "../services/user.service.js";

export const getAllUsers = asyncHandler(async (req, res) => {
  const data = await UserService.getAllUsers(req.query);
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

export const getMyInfo = asyncHandler(async (req, res) => {
  const myId = req.user?.sub;
  if (!myId) return res.status(401).json({ success: false, message: "Unauthorized" });

  const myInfo = await UserService.getMyInfo(myId);

  if (!myInfo) {
    return res.status(404).json({ success: false, message: "Not found" });
  }

  res.json({ success: true, data: myInfo });
});

export const getUserById = asyncHandler(async (req, res) => {
  // transfer the logic to the service
  const user = await UserService.getUserById(req.params.id);
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }
  res.json({ success: true, data: user });
});

export const createUser = asyncHandler(async (req, res) => {
  // transfer the logic to the service
  const { mail, password } = req.body;
  const user = await UserService.createUser(mail, password);
  res.json({ success: true, data: user });
});

export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // transfer the logic to the service
  const result = await UserService.deleteUser(id);

  // return
  return res.status(200).json({
    success: true,
    message: result.message,
  });
});

export const updateUserById = asyncHandler(async (req, res) => {
  // check role
  const data = req.body;
  const { id } = req.params;
  // transfer the logic to the service
  const updateUser = await UserService.updateUserById(id, data);

  return res.status(200).json({
    success: true,
    message: "Information updated successfully.",
    data: updateUser,
  });
});
