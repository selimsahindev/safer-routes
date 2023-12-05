import express, { Application } from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "10kb" }));

// Routes
app.use("/api/v1/auth", authRoutes);

export default app;
