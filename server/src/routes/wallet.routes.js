import { Router } from "express";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { getWallet, updateWallet } from "../controllers/wallet.controller.js";

export const router = Router();

router.use(requireAuth);

router.get("/me", getWallet);
router.put("/me", updateWallet);
