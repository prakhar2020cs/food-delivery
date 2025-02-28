import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
import { restaurantSchema } from "@/app/lib/restaurantsModel";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';


export async function POST(req){
    const {email} = req.body;

  
    try {
        await mongoose.connect(connectionStr, { serverSelectionTimeoutMS: 10000});
        let user = await restaurantSchema.findOne({ email});

        if(!user){
            return NextResponse.json({message: "user not found", success:"false"});
        }

           const token = jwt.sign(
            { email: user.email },
            process.env.JWT_SECRET, // Secret from environment variables
            { expiresIn: '1h' }
          );


    
      } catch (error) {
        console.error("Error verifying token", error);
        return NextResponse.json({ message: "Database connection failed", success: false }, { status: 500 });
      }
    
    
     
}

