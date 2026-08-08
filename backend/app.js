import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import dbconnect from "./Config/dbconnect.js";
import adminAuth from "./Router/adminRoutes.js";
import serviceAuth from "./Router/serviceRoutes.js";
import bannerAuth from "./Router/bannerRoutes.js";
import projectAuth from "./Router/projectRoutes.js";
import contactRoutes from "./Router/contactRoutes.js";
import adminContactAuth from "./Router/adminContactRoutes.js";
import reviewRoutes from "./Router/reviewRoutes.js";
import dashboardRoutes from "./Router/dashboardRoutes.js";
const app = express();
const port = process.env.PORT;
const currentDirectory = path.dirname(fileURLToPath(import.meta.url));

app.use("/uploads", express.static(path.join(currentDirectory, "uploads")));

const allowedOrigins = [
  "https://waldenstechsolutions.vercel.app",
  "https://waldens-tech-solutions.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(
  express.json({
    verify: (req, res, buf) => {
      console.log("Raw Body:");
      console.log(buf.toString());
    },
  }),
);
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use("/admin", adminAuth);
app.use("/admin/dashboard", dashboardRoutes);

// admin-only service routes
app.use("/admin/service", serviceAuth);
app.use("/admin/banner", bannerAuth);
app.use("/admin/project", projectAuth);
app.use("/admin/contact", adminContactAuth);

// public endpoints
app.use("/service", serviceAuth);
app.use("/contact", contactRoutes);
app.use("/reviews", reviewRoutes);

app.listen(port, () => {
  console.log(`running on ${port}`);
  dbconnect();
});
