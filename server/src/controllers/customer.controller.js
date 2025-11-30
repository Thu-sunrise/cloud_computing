import { asyncHandler } from "../utils/asyncHandler.js";
import { CustomerService } from "../services/customer.service.js";

export const getAllCustomers = asyncHandler(async (req, res) => {
  // transfer the logic to the service
  const data = await CustomerService.getAllCustomers(req.query);
  if (!data || data.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No customers found",
    });
  }
  res.json({ success: true, data: data });
});

export const createCustomer = asyncHandler(async (req, res) => {
  // transfer the logic to the service
  const { mail, password } = req.body;
  const user = await CustomerService.createCustomer(mail, password);
  res.json({ success: true, data: user });
});

export const getCustomerById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await CustomerService.getCustomerById(id);
  return res.status(200).json({
    success: true,
    message: result,
  });
});

export const updateMyInfo = asyncHandler(async (req, res) => {
  // const id = req.user.sub;
  const id = req.user?.sub;
  if (!id) return res.status(401).json({ success: false, message: "Unauthorized" });
  const data = req.body;
  // transfer the logic to the service
  const updateUser = await CustomerService.updateMyInfo(id, data);
  // return
  return res.status(200).json({
    success: true,
    message: "Information updated successfully.",
    data: updateUser,
  });
});

export const getAddresses = asyncHandler(async (req, res) => {
  const userId = req.user.sub;
  const addressId = req.params;

  const addresses = await CustomerService.getAddresses(userId, addressId);
  res.status(200).json({ success: true, data: addresses });
});

export const getListAddresses = asyncHandler(async (req, res) => {
  const id = req.user.sub;
  const addresses = await CustomerService.getListAddresses(id);
  res.status(200).json({ success: true, data: addresses });
});

export const addAddress = asyncHandler(async (req, res) => {
  const id = req.user.sub;
  const data = req.body;

  const addresses = await CustomerService.addAddress(id, data);
  res.status(200).json({ success: true, message: "Added new address", data: addresses });
});

export const updateAddress = asyncHandler(async (req, res) => {
  const addressId = req.params;
  const userId = req.user.sub;
  const data = req.body;

  const address = await CustomerService.updateAddress(userId, addressId, data);
  res.status(200).json({ success: true, message: "Address updated", data: address });
});

export const deleteAddress = asyncHandler(async (req, res) => {
  const userId = req.user.sub;
  const addressId = req.params;

  const addAddress = await CustomerService.deleteAddress(userId, addressId);
  res.status(200).json({ success: true, message: "Address deleted", data: addAddress });
});
