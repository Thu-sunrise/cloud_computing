import { Router } from "express";
import { getCart, addToCart, removeFromCart } from "../controllers/cart.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

export const router = Router();

router.use(requireAuth);

router.get("/me", getCart);

router.put("/:id", addToCart); // id is productId

router.delete("/:id", removeFromCart);
