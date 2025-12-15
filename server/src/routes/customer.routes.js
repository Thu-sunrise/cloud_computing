import { Router } from "express";
import {
  getListCustomers,
  getCustomer,
  updateCustomer,
} from "../controllers/customer.controller.js";

import { requireAuth } from "../middlewares/auth.middleware.js";
import { upload } from "../config/multer.js";

export const router = Router();

router.get("/list", getListCustomers);

router.get("/:id", getCustomer);

router.put("/me", requireAuth, upload.single("image"), updateCustomer);
