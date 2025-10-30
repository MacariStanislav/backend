import CarModel from "../models/carModel.js";

export const addCar = async (req, res) => {
  const db = req.app.locals.db;
  const cars = CarModel(db);

  const { title, description, price } = req.body;
  const images = req.files.images ? req.files.images.map(f => f.filename) : [];
  const videos = req.files.videos ? req.files.videos.map(f => f.filename) : [];

  const newCar = { title, description, price, images, videos, createdAt: new Date() };
  await cars.insertOne(newCar);
  res.json({ message: "Car added", car: newCar });
};

export const getAllCars = async (req, res) => {
  const db = req.app.locals.db;
  const cars = CarModel(db);

  const allCars = await cars.find().toArray();
  res.json(allCars);
};
