import express from "express";
import dotenv from "dotenv";
import cors from "cors"; 
import connectDB from "./config/db.js";
import adminRoutes from "./routes/admin.js";
import carsRoutes from "./routes/cars.js";

dotenv.config();

const app = express();


app.use(cors({
  origin: "*" 
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/uploads", express.static("uploads")); 


connectDB().then(db => {
  app.locals.db = db;


  app.use("/api/admin", adminRoutes);
  app.use("/api/cars", carsRoutes);

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
