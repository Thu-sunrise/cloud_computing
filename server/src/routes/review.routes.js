import { Router } from "express";
// import {...} from "../controllers/user.controller.js";
import {
  createReviewToProduct,
  deleteReview,
  getReviewsOfProduct,
  getReviewsAllMyProducts,
} from "../controllers/review.controller.js";
export const router = Router();
import { requireAuth, requireRole } from "../middlewares/auth.middleware.js";

// Define user-related routes here
router.get("/list/:id", requireAuth, getReviewsOfProduct); // id của sản phẩm muốn xem review
router.post("/new/:id", requireAuth, createReviewToProduct); // id của sản phẩm muốn review
router.delete("/:id", requireAuth, deleteReview); //id của chính review

/*
    ------------------------------------------------------------------------
    -------------PHAN NAY MINH THU CHUA TEST -> NE NO RA NHA----------------
    ------------------------------------------------------------------------
  */
router.get("/list/all/:id", getReviewsAllMyProducts); // lấy tất cả review về sản phẩm mà user đó bán (id của user muốn xem review)
