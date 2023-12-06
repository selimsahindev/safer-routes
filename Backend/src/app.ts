import express, { Application } from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

// Import was giving me an error, so I used require instead.
const xss = require('xss-clean');
const app: Application = express();

// Limit requests from the same IP.
const limiter = rateLimit({
  max: 100, // 100 requests per hour.
  windowMs: 60 * 60 * 1000, // In milliseconds.
  message: 'Too many requests from this IP, please try again in an hour!',
});

app.use('/api', limiter); // Apply the limiter only to the /api route.
app.use(xss()); // Data sanitization against XSS.
app.use(cors()); // Enable CORS.
app.use(helmet()); // Set security HTTP headers.
app.use(express.json({ limit: "10kb" })); // Parse JSON bodies, limit to 10kb.

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // Development logging.
}

// Routes
app.use("/api/v1/auth", authRoutes);

export default app;
