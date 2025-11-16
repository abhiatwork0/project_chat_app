
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

// Setup __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from backend/.env
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// Debug logs
console.log("📦 MONGO_URI loaded as:", process.env.MONGO_URI);
console.log("🌐 NODE_ENV:", process.env.NODE_ENV);

const PORT = process.env.PORT || 5001;
   3
// Middleware
app.use(express.json({ limit: "10mb" }));  // Increase limit for large payloads like images
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

// Start server
server.listen(PORT, () => {
  console.log("✅ Server is running on PORT:", PORT);
  connectDB();
});
