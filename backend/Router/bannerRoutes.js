import express from "express";
import { createBanner, getBanner, updateBanner, deleteBanner } from "../Controllers/bannerController.js";
import authMiddleware from "../Middleware/authMiddleware.js";
import adminMiddleware from "../Middleware/adminMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, adminMiddleware, createBanner);
router.get("/get", getBanner);
router.put("/update/:id", authMiddleware, adminMiddleware, updateBanner);
router.delete("/delete/:id", authMiddleware, adminMiddleware, deleteBanner);

export default router;
