import express from "express";
import authMiddleware from "../Middleware/authMiddleware.js";
import adminMiddleware from "../Middleware/adminMiddleware.js";
import { projectImageUpload } from "../Middleware/projectUpload.js";
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../Controllers/projectController.js";

const router = express.Router();

router.post("/create", authMiddleware, adminMiddleware, projectImageUpload.single("image"), createProject);
router.get("/", getProjects);
router.get("/:id", getProjectById);
router.put("/update/:id", authMiddleware, adminMiddleware, projectImageUpload.single("image"), updateProject);
router.delete("/delete/:id", authMiddleware, adminMiddleware, deleteProject);

export default router;
