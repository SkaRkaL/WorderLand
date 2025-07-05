import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";


// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

// Middleware to handle JSON requests
app.use(express.urlencoded({ extended: true }));

// API routes
app.use("/api/users", userRoutes);

// Test route
app.get("/api/ping", (req, res) => {
  res.send("🏓 Pong from Worderland server!");
});

app.get("/", (req, res) => {
  res.send("👋 Welcome to the Worderland API!");
});

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
