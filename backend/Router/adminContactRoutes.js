import express from "express";
import authMiddleware from "../Middleware/authMiddleware.js";
import adminMiddleware from "../Middleware/adminMiddleware.js";
import { fetchContacts, deleteContact } from "../Controllers/contactController.js";

const router = express.Router();

router.get("/get", authMiddleware, adminMiddleware, fetchContacts);
router.delete("/delete/:id", authMiddleware, adminMiddleware, deleteContact);

export default router;
