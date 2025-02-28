import { NextResponse } from 'next/server';
import { connectionStr } from "@/app/lib/db";
import { restaurantSchema } from "@/app/lib/restaurantsModel";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';

export async function POST(request) {


console.log("post-req-login")

  const { userEmail, userPassword, tokenToVerify } = await request.json();

  // If a token is provided, verify it
  if (tokenToVerify) {
    console.log("token", tokenToVerify)
    try {
      const decoded = jwt.verify(tokenToVerify, process.env.JWT_SECRET); // Verify the token

      console.log("decoded", decoded)
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
        { expiresIn: '1d' }
      );
      // Update user document with the new token
      await restaurantSchema.findByIdAndUpdate(userData._id, {
        token: token
      },
        { new: true }
      );

     


    const response = NextResponse.json({
      userData: {
        email: userData.email, city: userData.city, name: userData.name, restaurant: userData.restaurant
      }, token, success: true
    });

      // Set JWT token in an httpOnly, secure cookie
      response.cookies.set('token', token, {
        httpOnly: true, // Prevent client-side JavaScript access
        secure: process.env.NODE_ENV === 'production', // HTTPS only in production
        sameSite: 'lax', // Prevent CSRF attacks
        maxAge: 60 * 60 * 24, // 1 day
        path: '/', // Available to all routes
    });

console.log("token - set");
console.log(response.cookies.get('token')?.value )

      return response
    } catch (error) {
      console.log("error verifying token")
    }
  }

  return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
}
