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
  const user = await CustomerService.createCustomer(req.body);
  res.json({ success: true, data: user });
});

export const deleteCustomer = asyncHandler(async (req, res) => {
  const id = req.user?.sub;
  if (!id) return res.status(401).json({ success: false, message: "Unauthorized" });
  // transfer the logic to the service
  await customerService.deleteCustomer(id);
  // return
  return res.status(200).json({
    success: true,
    message: result.message,
  });
});

export const getAddresses = asyncHandler(async (req, res) => {
  const userId = req.user.sub;
  const addressId = req.params;

  const addresses = await customerService.getAddresses(userId, addressId);
  res.status(200).json({ success: true, data: addresses });
});

export const getListAddresses = asyncHandler(async (req, res) => {
  const id = req.user.sub;
  const addresses = await customerService.getListAddresses(id);
  res.status(200).json({ success: true, data: addresses });
});

export const addAddress = asyncHandler(async (req, res) => {
  const id = req.user.sub;
  const data = req.body;

  const addresses = await customerService.addAddress(id, data);
  res.status(200).json({ success: true, message: "Added new address", data: addresses });
});

export const updateAddress = asyncHandler(async (req, res) => {
  const addressId = req.params;
  const userId = req.user.sub;
  const data = req.body;

  const address = await customerService.updateAddress(userId, addressId, data);
  res.status(200).json({ success: true, message: "Address updated", data: address });
});

export const deleteAddress = asyncHandler(async (req, res) => {
  const userId = req.user.sub;
  const addressId = req.params;

  const addAddress = await customerService.deleteAddress(userId, addressId);
  res.status(200).json({ success: true, message: "Address deleted", data: addAddress });
});
