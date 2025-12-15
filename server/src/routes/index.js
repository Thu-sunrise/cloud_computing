// Main router file to aggregate all route modules
import express from "express";
import { router as authRoutes } from "./auth.routes.js";
import { router as userRoutes } from "./user.routes.js";
import { router as customerRoutes } from "./customer.routes.js";
// import { router as productRoutes } from "./product.route.js";
import { router as adminRoutes } from "./admin.routes.js";
import { router as reviewRoutes } from "./review.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
// router.use("/product", productRoutes);
router.use("/customer", customerRoutes);
router.use("/admin", adminRoutes);
router.use("/review", reviewRoutes);

export default router;
