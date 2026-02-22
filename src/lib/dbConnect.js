import mongoose from "mongoose";
import { connectionStr } from "./db";

export async function dbConnect() {
    try {
        if (mongoose.connection.readyState >= 1) {
            return;
        }
        console.log("MONGO_URI:", process.env.MONGODB_URI);
        console.log("Connecting to MongoDB...");
        return await mongoose.connect(connectionStr);
    } catch (error) {
        console.log("MongoDB connection error", error.message);
        throw new Error("Failed to connect to database");
    }
}
