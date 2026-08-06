import express from "express";
import {
  createService,
  deleteService,
  getAllService,
  updateService,
} from "../Controllers/serviceController.js";
import adminMiddleware from "../Middleware/adminMiddleware.js";
import authMiddleware from "../Middleware/authMiddleware.js";
const router = express.Router();

// Public service listing for frontend consumption
router.get("/get", getAllService);

router.post("/create", authMiddleware, adminMiddleware, createService);
router.get("/getService", authMiddleware, adminMiddleware, getAllService);
router.put("/update/:id", authMiddleware, adminMiddleware, updateService);
router.delete("/delete/:id", authMiddleware, adminMiddleware, deleteService);

export default router;
