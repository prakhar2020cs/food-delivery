import mongoose from "mongoose";

const dishSchema = new mongoose.Schema({
    email: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
}, { timestamps: true });

export default mongoose.models.dishes || mongoose.model("dishes", dishSchema);
