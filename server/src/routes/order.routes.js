import { Router } from "express";
import { createOrder, getListOrders } from "../controllers/order.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

export const router = Router();

router.use(requireAuth);

router.post("/", createOrder);

router.get("/list", getListOrders);
