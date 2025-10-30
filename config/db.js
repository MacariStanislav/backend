import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);

async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");
    return client.db();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

export default connectDB;
