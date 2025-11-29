// Main router file to aggregate all route modules
import express from "express";
import { router as authRoutes } from "./auth.routes.js";
import { router as userRoutes } from "./user.route.js";
import { router as customerRoutes } from "./customer.route.js";
import { router as productRoutes } from "./product.route.js";
import { router as adminRoutes } from "./admin.route.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/product", productRoutes);
router.use("/customer", customerRoutes);
router.use("/admin", adminRoutes);

export default router;
