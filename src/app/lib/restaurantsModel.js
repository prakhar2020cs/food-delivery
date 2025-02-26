import mongoose from "mongoose";

const restaurantModel = new mongoose.Schema({
    name: { type: String },
    email: { type: String , unique: true },
    city: { type: String  },
    restaurant: { type: String  },
    password: { type: String  },
    address: { type: String },
    contact: { type: String  },
    token: { type: String , unique: true },
})

export const restaurantSchema = mongoose.models.restaurants || mongoose.model("restaurants", restaurantModel);