import express from "express";
import upload from "../utils/upload.js";
import adminAuth from "../middleware/auth.js";
import { addCar, getAllCars } from "../controllers/adminController.js";

const router = express.Router();

router.use(adminAuth);

router.post("/add", upload.fields([
  { name: "images", maxCount: 5 },
  { name: "videos", maxCount: 2 }
]), addCar);

router.get("/cars", getAllCars);

export default router;
