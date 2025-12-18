import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import { app, server } from "./lib/socket.js";

// ------------------
// ESM __dirname fix
// ------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ------------------
// Load environment variables
// ------------------
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// ------------------
// Port (Render compatible)
// ------------------
const PORT = process.env.PORT || 5001;

// ------------------
// Middleware
// ------------------
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

// ------------------
// CORS (local + deployed frontend)
// ------------------
const allowedOrigins = [
  "http://localhost:5173",
  "https://project-chat-app-epg3.onrender.com",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
    credentials: true,
  })
);

// ------------------
// Routes
// ------------------
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// ------------------
// Health check route
// ------------------
app.get("/", (req, res) => {
  res.status(200).send("Backend API is running");
});

// ------------------
// Start server after DB connects
// ------------------
connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1);
  });

  