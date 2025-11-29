import { Router } from "express";
// import {...} from "../controllers/customer.controller.js";
import CustomerController from "../controllers/customer.controller.js";
export const router = Router();
import { requireAuth } from "../middlewares/auth.middleware.js";

// Define customer-related routes here
router.get("/list", requireAuth, CustomerController.getAllCustomers);
router.post("/new", CustomerController.createCustomer);
router.put("/profile", requireAuth, CustomerController.updateCustomer);
router.get("/profile", requireAuth, CustomerController.getMyInfo);
router.get("/:id", CustomerController.getCustomerById);
router.delete("/:id", requireAuth, CustomerController.deleteCustomer);

router.get("/address/list", requireAuth, CustomerController.getListAddresses);
router.get("/address/:id", requireAuth, CustomerController.getAddresses);
router.post("/address/new", requireAuth, CustomerController.addAddress);
router.put("/address/:id", requireAuth, CustomerController.updateAddress);
router.delete("/address/:id", requireAuth, CustomerController.deleteAddress);
// Example: api/customer/list?page=1&limit=10&search=abc&sort=asc&....
// if query params not provided, use default values in controller (remcommended)
