import express from "express";
import {
  adminLogin,
  getCurrentAdmin,
  logoutAdmin,
  RegisterAdmin,
} from "../Controllers/adminController.js";

import authMiddleware from "../Middleware/authMiddleware.js";
import adminMiddleware from "../Middleware/adminMiddleware.js";

const router = express.Router();

// Public routes
router.post("/register", RegisterAdmin);
router.post("/login", adminLogin);

// Protected routes
router.post("/logout", authMiddleware, adminMiddleware, logoutAdmin);
router.get("/me", authMiddleware, adminMiddleware, getCurrentAdmin);

export default router;