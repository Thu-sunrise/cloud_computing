import { Router } from "express";
import {
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getListProducts,
  getMyListProducts,
} from "../controllers/product.controller.js";
import { requireAuth, optionalAuth } from "../middlewares/auth.middleware.js";

import { upload } from "../config/multer.js";

export const router = Router();

router.post("/", requireAuth, upload.single("image"), createProduct);

router.put("/:id", requireAuth, upload.single("image"), updateProduct);

router.delete("/:id", requireAuth, deleteProduct);

router.get("/list", optionalAuth, getListProducts);

router.get("/my-list", requireAuth, getMyListProducts);

router.get("/:id", optionalAuth, getProduct);
