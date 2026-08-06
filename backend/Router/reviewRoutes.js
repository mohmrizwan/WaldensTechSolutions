import express from "express";
import authMiddleware from "../Middleware/authMiddleware.js";
import adminMiddleware from "../Middleware/adminMiddleware.js";
import { createReview, getReviews } from "../Controllers/reviewController.js";

const router = express.Router();

router.get("/", getReviews);
router.post("/create", authMiddleware, adminMiddleware, createReview);

export default router;
