import mongoose from "mongoose";

const dishModel = new mongoose.Schema({
  email:{ type: String, required: true},
  itemId: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String },

 
},{timestamps:true}

);

const dishSchema = mongoose.models.dishes || mongoose.model("dishes", dishModel);
export default dishSchema;