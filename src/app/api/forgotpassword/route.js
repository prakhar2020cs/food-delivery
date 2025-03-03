import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
import { restaurantSchema } from "@/app/lib/restaurantsModel";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import { sendEmail } from "@/app/utils/sendEmail";


export async function POST(req) {
  const { email } = await req.json();
  let forgetpasswordtoken;
  console.log(email)

  try {
    await mongoose.connect(connectionStr, { serverSelectionTimeoutMS: 10000 });
    let user = await restaurantSchema.findOne({ email });
    console.log("user details ", user)
    if (!user) {

      return NextResponse.json({ message: "user not found", success: "false" });
    }

     forgetpasswordtoken = jwt.sign(
      { email: user.email },
      process.env.JWT_SECRET, // Secret from environment variables
      { expiresIn: '1h' }
    );


    let updatedUser = await restaurantSchema.findOneAndUpdate(
      { email }, // Find user where "token" matches
      { forgetpasswordtoken }, // Update fields
      { new: true }
    );
    console.log("forgot pass api", updatedUser)


  } catch (error) {
    console.error("Error verifying token", error);
    return NextResponse.json({ message: "Database connection failed", success: false }, { status: 500 });
  }


  try {
    console.log("inside email try")

    const resetLink = `http://localhost:3000/resetpassword/${forgetpasswordtoken}`;
  
    const emailResponse = await sendEmail(
      {
        to: email,
        subject: "Password Reset Request",
        message: `Click <a href="${resetLink}">here</a> to reset your password.`
      }
    )

    console.log("inside email try2")
    console.log("email response", emailResponse);
    if (!emailResponse.success) {
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });

    }
    return NextResponse.json({ message: "Sent a forgetpassword link to your registered email", success: true });



  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "Cannot send a forgetpassword link to your registered email ", success: false }, { status: 500 })
  }






}

