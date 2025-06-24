// src/index.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import taskRoutes from "./routes/tasks";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"], // ✅ Important
  })
);
app.use(express.json()); // VERY IMPORTANT for req.body to work

app.use("/api/auth", authRoutes); // use the router
app.use("/api/tasks", taskRoutes);

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
