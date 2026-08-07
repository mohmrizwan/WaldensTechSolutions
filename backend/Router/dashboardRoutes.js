import express from "express";
import authMiddleware from "../Middleware/authMiddleware.js";
import adminMiddleware from "../Middleware/adminMiddleware.js";
import { getDashboardStats, getRecentActivity } from "../Controllers/dashboardController.js";

const router = express.Router();

router.get("/stats", authMiddleware, adminMiddleware, getDashboardStats);
router.get("/activity", authMiddleware, adminMiddleware, getRecentActivity);

export default router;
