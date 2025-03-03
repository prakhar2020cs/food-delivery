import mongoose from "mongoose";
import { connectionStr } from "./db";

export async function dbConnect() {
  try {
    if (mongoose.connection.readyState >= 1) {
      return;
    }
    
    return await mongoose.connect(connectionStr);
  } catch (error) {
    console.log("MongoDB connection error", error);
    throw new Error("Failed to connect to database");
  }
}