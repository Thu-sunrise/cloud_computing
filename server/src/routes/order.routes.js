import { Router } from "express";
import { createOrder, getOrderHistory, getOrderList } from "../controllers/order.controller.js";
import { requireAuth, requireRole } from "../middlewares/auth.middleware.js";

export const router = Router();

router.use(requireAuth);

router.post("/", createOrder);

router.get("/order-history", getOrderHistory);

router.get("/list", requireRole("admin"), getOrderList);
