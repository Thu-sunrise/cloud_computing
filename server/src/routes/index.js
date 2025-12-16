// Main router file to aggregate all route modules
import express from "express";
import { router as authRoutes } from "./auth.routes.js";
// import { router as userRoutes } from "./user.route.js";
// import { router as customerRoutes } from "./customer.route.js";
import { router as productRoutes } from "./product.routes.js";
// import { router as adminRoutes } from "./admin.route.js";
import { router as cartRoutes } from "./cart.routes.js";
import { router as orderRoutes } from "./order.routes.js";
import { router as customerRoutes } from "./customer.routes.js";
// import { router as productRoutes } from "./product.route.js";
import { router as userRoutes } from "./user.routes.js";
import { router as reviewRoutes } from "./review.routes.js";
import { router as categoryRoutes } from "./category.routes.js";
import { router as walletRoutes } from "./wallet.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
// router.use("/user", userRoutes);
router.use("/product", productRoutes);
// router.use("/customer", customerRoutes);
// router.use("/admin", adminRoutes);
router.use("/cart", cartRoutes);
router.use("/order", orderRoutes);
router.use("/user", userRoutes);
router.use("/customer", customerRoutes);
// router.use("/product", productRoutes);
router.use("/category", categoryRoutes);
router.use("/wallet", walletRoutes);
router.use("/review", reviewRoutes);

export default router;
