import { Router } from "express";
import {
  getListCustomers,
  getCustomer,
  updateCustomer,
  getTopSellingCustomers,
} from "../controllers/customer.controller.js";

import { requireAuth } from "../middlewares/auth.middleware.js";
import { upload } from "../config/multer.js";

export const router = Router();

router.get("/list", getListCustomers);

router.put("/:id", requireAuth, upload.single("image"), updateCustomer);

router.get("/top-selling", getTopSellingCustomers);

router.get("/:id", getCustomer);
