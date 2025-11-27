import { Router } from "express";
// import {...} from "../controllers/customer.controller.js";
import CustomerController from "../controllers/customer.controller.js";
export const router = Router();
import { requireAuth } from "../middlewares/auth.middleware.js";

// Define customer-related routes here
router.get("/list", CustomerController.getAllCustomers);
router.post("/newCustomer", CustomerController.createCustomer);
router.get("/addresses/list", requireAuth, CustomerController.getListAddresses);
router.get("/addresses/:id", requireAuth, CustomerController.getAddresses);
router.post("/addresses/new", requireAuth, CustomerController.addAddress);
router.put("/addresses/:id", requireAuth, CustomerController.updateAddress);
router.delete("/addresses/:id", requireAuth, CustomerController.deleteAddress);
router.put("/:id", requireAuth, CustomerController.updateCustomer);
router.get("/:id", CustomerController.getCustomerById);
router.delete("/:id", requireAuth, CustomerController.deleteCustomer);
// Example: api/customer/list?page=1&limit=10&search=abc&sort=asc&....
// if query params not provided, use default values in controller (remcommended)
