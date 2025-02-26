import { NextResponse } from 'next/server';
import { connectionStr } from "@/app/lib/db";
import { restaurantSchema } from "@/app/lib/restaurantsModel";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';

export async function POST(request) {




  const { userEmail, userPassword, tokenToVerify } = await request.json();

  // If a token is provided, verify it
  if (tokenToVerify) {
    console.log("token", tokenToVerify)
    try {
      const decoded = jwt.verify(tokenToVerify, process.env.JWT_SECRET); // Verify the token
      return NextResponse.json({ message: "Token is valid", user: decoded, success: true });
    } catch (err) {
      return NextResponse.json({ message: "Invalid or expired token", success: false }, { status: 401 });
    }
  }

  try {
    await mongoose.connect(connectionStr, { serverSelectionTimeoutMS: 10000});
  } catch (error) {
    console.error("MongoDB Connection Error:---->", error);
    return NextResponse.json({ message: "Database connection failed", success: false }, { status: 500 });
  }


  let userData = await restaurantSchema.findOne({ email: userEmail, password: userPassword });

  if (userData) {

    try {

      const token = jwt.sign(
        { email: userData.email },
        process.env.JWT_SECRET, // Secret from environment variables
        { expiresIn: '1h' }
      );
      // Update user document with the new token
      await restaurantSchema.findByIdAndUpdate(userData._id, {
        token: token
      },
        { new: true }
      );

      return NextResponse.json({
        userData: {
          email: userData.email, city: userData.city, name: userData.name, restaurant: userData.restaurant
        }, token, success: true
      });
    } catch (error) {
      console.log("error verifying token")
    }
  }

  return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
}
