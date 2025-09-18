import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./db/db.js";
import userRoutes from "./routes/userRoutes.js";
import captainRoutes from "./routes/captainRoutes.js"

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // so you can read req.body
app.use(cookieParser())
// Database connection
connectDB();

// Test route
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// User routes
app.use("/users", userRoutes);
app.use("/captain", captainRoutes)

export default app;
