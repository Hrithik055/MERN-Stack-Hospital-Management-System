import mongoose from "mongoose";
import dotenv from "dotenv";

// Load .env variables
dotenv.config();

export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "HOSPITAL_MANAGEMENT_SYSTEM",
    })
    .then(() => {
      console.log("✅ Connected to database!");
    })
    .catch((err) => {
      console.error("❌ Some error occurred while connecting to database:", err);
    });
};
