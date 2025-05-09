import mongoose from "mongoose";
import dishSchema from "/src/app/lib/dishesModel";
import { NextResponse } from "next/server";
import { connectionStr } from "@/app/lib/db";
import { dbConnect } from "@/app/lib/dbConnect";

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
      return NextResponse.json({dishes, success: true} ,{ status: 200 });
    } catch (error) {
      return NextResponse.json({ message: "Error fetching dishes", error }, { status: 500 });
    }
  }

  export async function POST(req) {

 


await dbConnect();
const {email} = await req.json();

if(email){
  try {
    const dishes = await dishSchema.find({email})
    ;
    console.log("dishes---", dishes);
    return NextResponse.json({dishes , success:true},{status:200});
  } catch (error) {
    return NextResponse.json({message: "error getting dishes" , success:false},{status:500})
  }
 


}

      try {
      
   console.log("--new dish----")
let newDish = await req.json();
console.log("--new dish", newDish);
    let dish = new dishSchema(newDish);
  
    const result = await dish.save();
    console.log("new saved dish", result);
       
        return NextResponse.json({result, success: true} ,{ status: 200 });
      } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error creating dishes", error }, { status: 500 });
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