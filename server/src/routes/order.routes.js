import { Router } from "express";
import { createOrder, getOrderHistory, getOrderList } from "../controllers/order.controller.js";
import { requireAuth, requireRole } from "../middlewares/auth.middleware.js";

export const router = Router();

// Example: api/product/list?page=1&limit=10&search=abc&sort=asc&category=electronics&priceMin=100&priceMax=1000
// if query params not provided, use default values in controller (remcommended)
router.post("/", requireAuth, createOrder);

router.get("/order-history/:customerId", requireAuth, getOrderHistory);

router.post("/list", requireAuth, requireRole("admin"), getOrderList);
