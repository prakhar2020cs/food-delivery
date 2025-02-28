import mongoose from "mongoose";

const dishModel = new mongoose.Schema({
  itemId: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  ingredients: { type: [String], required: true },
  ingredients: { type: [String], required: true },
},

);

const dishSchema = mongoose.models.dishes || mongoose.model("dishes", dishModel);
export default dishSchema;