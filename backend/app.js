import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import cors from "cors";
import dbconnect from "./Config/dbconnect.js";
import adminAuth from "./Router/adminRoutes.js";
import serviceAuth from "./Router/serviceRoutes.js";
import bannerAuth from "./Router/bannerRoutes.js";
import projectAuth from "./Router/projectRoutes.js";
import contactRoutes from "./Router/contactRoutes.js";
import adminContactAuth from "./Router/adminContactRoutes.js";
import reviewRoutes from "./Router/reviewRoutes.js";
const app = express();
const port = process.env.PORT;

app.use(cookieParser());

const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
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
