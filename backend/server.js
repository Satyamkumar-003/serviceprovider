import express from "express";

import dotenv from "dotenv";
import connectDB from "./config/db.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";

dotenv.config();
connectDB();

const app = express();
app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With, Content-Type,Accept"
  );
  next();
}  )

// Middleware
app.use(express.json());
app.use(cors()); // ✅ Enable CORS for frontend

// Default route to check if API is running
app.get("/", (req, res) => {
  res.send("API is running...");
});

// API Routes
app.use("/api/services", serviceRoutes);
app.use("/api/users", userRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
