import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import adminRoutes from "./routes/admin.js";
import carsRoutes from "./routes/cars.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/uploads", express.static("uploads")); 

connectDB().then(db => {
  app.locals.db = db;

  app.use("/api/admin", adminRoutes);
  app.use("/api/cars", carsRoutes);

  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
});
