import { NextResponse } from 'next/server';
import { connectionStr } from "@/app/lib/db";
import { restaurantSchema } from "@/app/lib/restaurantsModel";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import { dbConnect } from '@/app/lib/dbConnect';

export async function POST(request) {


console.log("request data",request)

 
const authHeader = request.headers.get("Authorization");
console.log("auth",authHeader);
const tokenToVerify = authHeader?.split(" ")[1]; 
console.log("tokenToVerify---",tokenToVerify);
  // If a token is provided, verify it
  if (tokenToVerify) {
    console.log("token", tokenToVerify)
    try {
      const decoded = jwt.verify(tokenToVerify, process.env.JWT_SECRET); // Verify the token

      console.log("decoded", decoded)
      return NextResponse.redirect(new URL('/dashboard', request.url));

    } catch (err) {
      return NextResponse.json({ message: "Invalid or expired token", success: false }, { status: 401 });
    }
  }
  else{
    console.log("token not get")
  }

  const { userEmail, userPassword} = await request.json();
 await dbConnect();

 


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
