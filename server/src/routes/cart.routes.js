import { Router } from "express";
import { getCart, addToCart, removeOne } from "../controllers/cart.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

export const router = Router();

router.get("/me", requireAuth, getCart);

router.put("/:productId", requireAuth, addToCart); // owner

router.delete("/:productId", requireAuth, removeOne);
