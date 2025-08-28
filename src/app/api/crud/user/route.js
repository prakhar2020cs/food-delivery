import mongoose from "mongoose";
// import { NextResponse } from 'next/server';
// import { connectionStr } from "@/app/lib/db";
import { restaurantSchema } from "@/app/lib/restaurantsModel"; // Import restaurantModel model
import { dbConnect } from "@/app/lib/dbConnect";


// Connect to MongoDB
// await mongoose.connect(connectionStr);

export async function GET(req) {
 await dbConnect();

 try {
 
  const authHeader = req.headers.get("Authorization");
  console.log("auth",authHeader);
  const token = authHeader?.split(" ")[1];

  if (token) {
    const user = await restaurantSchema.findOne({ token });
    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }
    return Response.json({ user, success: true });
  }else{
    return Response.json({ error: "No token found" }, { status: 404 });
  }

 } catch (error) {
  return Response.json({ error: "Something went wrong" }, { status: 404 })
 }

}

export async function PUT(req) {
  await dbConnect();

  try {
    const data = await req.json();
    const { token } = data;
    
    // If only token is provided, just fetch the user
    if (Object.keys(data).length === 1 && token) {
      const user = await restaurantSchema.findOne({ token });
      if (!user) {
        return Response.json({ error: "User not found" }, { status: 404 });
      }
      return Response.json({ user, success: true });
    }

    // Existing update logic
    const { name, city, email, restaurant } = data;
    const updatedUser = await restaurantSchema.findOneAndUpdate(
      { token },
      { name, email, city, restaurant },
      { new: true }
    );
    console.log("updated User---", updatedUser);
    return Response.json({ message: "User updated", user: updatedUser, success: true });
  } catch (error) {
    console.log("error---", error);
    return Response.json({ error: error.message }, { status: 500 });
  }

  


}

export async function DELETE(req) {
  await dbConnect();

  try {
    const { token } = await req.json();
  
    const res = await restaurantSchema.findOneAndDelete({ token });
    console.log("user deleted",res);
    
    return Response.json({ message: "User deleted" , success:true});
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}