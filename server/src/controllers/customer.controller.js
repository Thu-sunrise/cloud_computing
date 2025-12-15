import { asyncHandler } from "../utils/asyncHandler.js";
import { CustomerService } from "../services/customer.service.js";

export const getListCustomers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, search } = req.query;

  const result = await CustomerService.getList(Number(page), Number(limit), search);

  res.status(200).json({
    message: "Get list customers successfully",
    ...result,
  });
});

export const getCustomer = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await CustomerService.getById(id);
  return res.status(200).json({
    message: "Get customer successfully",
    data: result,
  });
});

export const updateCustomer = asyncHandler(async (req, res) => {
  const id = req.user.sub;
  const payload = req.body;
  const image = req.file;
  const updateUser = await CustomerService.update(id, payload, image);

  return res.status(200).json({
    message: "Information updated successfully.",
    data: updateUser,
  });
});
