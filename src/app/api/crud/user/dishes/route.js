import mongoose from "mongoose";
import dishSchema from "/src/app/lib/dishesModel";
import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";

export async function GET() {
    try {
      await mongoose.connect(connectionStr);
  
      const dishes = await dishSchema.find({});
      return NextResponse.json(dishes, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: "Error fetching dishes", error }, { status: 500 });
    }
  }

export async function PUT(req) {

  try{
    await mongoose.connect(connectionStr);

  }catch(error){
    console.log("MongoDb connection error", error);
return NextResponse.json({message:"there is error connecting to database", success:"false"});
  }
    try {
    
  const { _id ,itemId, name, description} = await req.json();
      const dishes = await dishSchema.findOneAndUpdate(
        {_id},
        { itemId ,name, description},
        {new:true}
      );
      return NextResponse.json(dishes, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: "Error fetching dishes", error }, { status: 500 });
    }
  }


//   try{
//     await mongoose.connect(connectionStr);

//   }catch(error){
//     console.log("MongoDb connection error", error);
// return NextResponse.json({message:"there is error connecting to database", success:"false"});
//   }

//   try {
//     const { token, name, city,email,restaurant } = await req.json();
//     const updatedUser = await restaurantSchema.findOneAndUpdate(
//       { token }, // Find user where "token" matches
//   { name, email, city ,restaurant}, // Update fields
//   { new: true }
//     );
//     return Response.json({ message: "User updated", user: updatedUser });
//   } catch (error) {
//     return Response.json({ error: error.message }, { status: 500 });
//   }