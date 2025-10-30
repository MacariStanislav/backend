import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { MongoClient } from "mongodb";
import adminRoutes from "./routes/admin.js";
import carsRoutes from "./routes/cars.js";

dotenv.config();

const app = express();

// Настройка CORS для всех
app.use(cors({ origin: "*" }));

// Body парсер
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Статика для загрузок
app.use("/uploads", express.static("uploads"));

// Функция для подключения к MongoDB и запуска сервера
async function startServer() {
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
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Завершаем процесс, если подключение не удалось
  }
}

// Запуск
startServer();
