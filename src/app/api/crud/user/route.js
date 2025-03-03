import mongoose from "mongoose";
import { NextResponse } from 'next/server';
import { connectionStr } from "@/app/lib/db";
import { restaurantSchema } from "@/app/lib/restaurantsModel"; // Import restaurantModel model
import { dbConnect } from "@/app/lib/dbConnect";


// Connect to MongoDB
await mongoose.connect(connectionStr);



export async function PUT(req) {
  try{
    await mongoose.connect(connectionStr);

  }catch(error){
    console.log("MongoDb connection error", error);
return NextResponse.json({message:"there is error connecting to database", success:"false"});
  }

  try {
    const { token, name, city,email,restaurant } = await req.json();
    const updatedUser = await restaurantSchema.findOneAndUpdate(
      { token }, // Find user where "token" matches
  { name, email, city ,restaurant}, // Update fields
  { new: true }
    );
    return Response.json({ message: "User updated", user: updatedUser, success:true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
 dbConnect();

  try {
    const { token } = await req.json();
    const res = await restaurantSchema.findOneAndDelete({ token });
    console.log("user deleted",res);
    return Response.json({ message: "User deleted" , success:true});
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}