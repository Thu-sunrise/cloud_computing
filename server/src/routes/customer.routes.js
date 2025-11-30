import { Router } from "express";
import {
  getListAddresses,
  getAddresses,
  getAllCustomers,
  addAddress,
  deleteAddress,
  updateAddress,
  createCustomer,
  getCustomerById,
  updateMyInfo,
} from "../controllers/customer.controller.js";
export const router = Router();
import { requireAuth } from "../middlewares/auth.middleware.js";

// Define customer-related routes here
router.get("/list", requireAuth, getAllCustomers);
router.get("/:id", getCustomerById);
router.put("/:id", updateMyInfo);

router.get("/address/list", requireAuth, getListAddresses);
router.get("/address/:id", requireAuth, getAddresses);
router.post("/address/new", requireAuth, addAddress);
router.put("/address/:id", requireAuth, updateAddress);
router.delete("/address/:id", requireAuth, deleteAddress);
// Example: api/customer/list?page=1&limit=10&search=abc&sort=asc&....
// if query params not provided, use default values in controller (remcommended)
