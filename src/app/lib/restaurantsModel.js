import mongoose from "mongoose";

const restaurantModel = new mongoose.Schema({
    name: { type: String },
    email: { type: String , unique: true, required:true },
    city: { type: String  },
    restaurant: { type: String  },
    password: { type: String , required:true },
    address: { type: String },
    contact: { type: String  },
    token: { type: String ,default:null },
    forgetpasswordtoken: { type: String ,default:null},
})

export const restaurantSchema = mongoose.models.restaurants || mongoose.model("restaurants", restaurantModel);

