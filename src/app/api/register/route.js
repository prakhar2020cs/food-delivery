import { connectionStr } from "@/app/lib/db";
import { restaurantSchema } from "@/app/lib/restaurantsModel";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import { NextResponse } from "next/server";

export async function GET(request) {
    await mongoose.connect(connectionStr);
    const { searchParams } = new URL(request.url);
    const userEmail = searchParams.get('email');
    console.log("userEmail", userEmail)
    let data;
    if (userEmail) {
        data = await restaurantSchema.findOne({ email: userEmail });
        console.log("data connection", data);
    } else {
        return NextResponse.json({ message: 'Email is required to find the user' }, { status: 400 });
    }

    if (!data) {
        return NextResponse.json({ message: 'user not found', success: 'false' }, { status: '404' });
    }

    const token = jwt.sign(
        { username },
        process.env.JWT_SECRET, // Secret from environment variables
        { expiresIn: '1h' }
      );

    return NextResponse.json({ user: data,token, success: true });
}


function validateUserData({ name, email, password }) {
    if (!name || name.length < 3) return "Name must be at least 3 characters long.";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Invalid email format.";
    if (!password || password.length < 6) return "Password must be at least 6 characters long.";
    return null; // No validation errors
  }

export async function POST(request) {

      

    let payload = await request.json();
    console.log(payload);
    
    const error = validateUserData(payload);
    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }
     
    console.log("payload", payload);
    try{
      await mongoose.connect(connectionStr);

//       await restaurantSchema.syncIndexes();
// console.log("Indexes synced successfully!");
      // await restaurantSchema.collection.createIndex({ email: 1 }, { unique: true });
      // console.log("Unique index on email created successfully!");
      
      // const indexes = await mongoose.connection.db.collection("restaurants").indexes();
      // console.log("Indexes:", indexes);

      // await mongoose.connection.db.collection("restaurants").dropIndex("email_1");
      // console.log("Unique index on forgetpasswordtoken removed!");
  
      let restaurant = new restaurantSchema(payload);
  
    const result = await restaurant.save();
 
    console.log("result full data", result);
    return NextResponse.json({ message:"user registered", success: true })

    }catch(error){
      console.log("MongoDb connection error", error);
return NextResponse.json({message:"user already exists", success:false});

    }
  
    
// console.log("last")

//     return NextResponse.json({  success: true })
}