import { Router } from "express";
// import {...} from "../controllers/customer.controller.js";
import CustomerController from "../controllers/customer.controller.js";
export const router = Router();

// Define customer-related routes here
router.put("/:id", CustomerController.updateCustomer);
router.get("/:id", CustomerController.getCustomerById);
router.post("/:id", CustomerController.createCustomer);
router.delete("/:id", CustomerController.deleteCustomer);
router.get("/list", CustomerController.getAllCustomers);
// Example: api/customer/list?page=1&limit=10&search=abc&sort=asc&....
// if query params not provided, use default values in controller (remcommended)
