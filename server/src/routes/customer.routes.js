import { Router } from "express";
import {
  getListCustomers,
  getCustomer,
  updateCustomer,
  getTopSellingCustomers,
  getMe,
} from "../controllers/customer.controller.js";

import { requireAuth } from "../middlewares/auth.middleware.js";
import { upload } from "../config/multer.js";

export const router = Router();

router.get("/list", getListCustomers);

router.put("/me", requireAuth, upload.single("image"), updateCustomer);

router.get("/me", requireAuth, getMe);

router.get("/top-selling", getTopSellingCustomers);

router.get("/:id", getCustomer);