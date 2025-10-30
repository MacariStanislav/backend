import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { MongoClient } from "mongodb";
import adminRoutes from "./routes/admin.js";
import carsRoutes from "./routes/cars.js";

dotenv.config();

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

// Подключение к MongoDB через async IIFE
(async () => {
  try {
    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    console.log("Connected to MongoDB!");
    app.locals.db = client.db("carDB");

    // Роуты
    app.use("/api/admin", adminRoutes);
    app.use("/api/cars", carsRoutes);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1); // аварийный выход
  }
})();
