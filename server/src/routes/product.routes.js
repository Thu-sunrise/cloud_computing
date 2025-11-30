import { Router } from "express";
import {
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getListProducts,
} from "../controllers/product.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

import { upload } from "../config/multer.js";

export const router = Router();

// Example: api/product/list?page=1&limit=10&search=abc&sort=asc&category=electronics&priceMin=100&priceMax=1000
// if query params not provided, use default values in controller (remcommended)


router.get("/:id", getProduct);
 
router.post("/", requireAuth, upload.array("file"), createProduct);

router.put("/:id", requireAuth, upload.array("file"), updateProduct);

router.delete("/:id", requireAuth, deleteProduct);

router.get("/list", getListProducts);
