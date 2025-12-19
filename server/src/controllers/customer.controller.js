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
  const { id } = req.params;
  const user = {
    id: req.user?.sub,
    role: req.user?.role,
  };
  const payload = req.body;
  const image = req.file;
  const updateUser = await CustomerService.update(user, id, payload, image);

  return res.status(200).json({
    message: "Information updated successfully.",
    data: updateUser,
  });
});

export const getTopSellingCustomers = asyncHandler(async (req, res) => {
  const result = await CustomerService.getTopSelling();

  return res.status(200).json({
    message: "Get top selling customers successfully.",
    data: result,
  });
});
