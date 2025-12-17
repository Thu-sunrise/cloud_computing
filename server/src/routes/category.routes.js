import { Router } from "express";
import { getListCategories, getTopSellingCategories } from "../controllers/category.controller.js";

export const router = Router();

router.get("/list", getListCategories);

router.get("/top-selling", getTopSellingCategories);
