import { Router } from "express";
import { createReview, getListReviews } from "../controllers/review.controller.js";
export const router = Router();
import { requireAuth } from "../middlewares/auth.middleware.js";

router.get("/list/:id", getListReviews); // id of user
router.post("/", requireAuth, createReview);
