import mongoose from "mongoose";

const restaurantModel = new mongoose.Schema({
    name: { type: String },
    email: { type: String  },
    city: { type: String  },
    address: { type: String },
    contact: { type: String  },
})

export const restaurantSchema = mongoose.models.restaurants || mongoose.model("restaurants", restaurantModel);