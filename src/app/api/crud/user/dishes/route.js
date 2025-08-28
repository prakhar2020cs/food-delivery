import mongoose from "mongoose";
import dishSchema from "/src/app/lib/dishesModel";
import { NextResponse } from "next/server";
// import { connectionStr } from "@/app/lib/db";
import { dbConnect } from "@/app/lib/dbConnect";

export async function GET(req) {

  await dbConnect();

    try {
     
  const email = req.headers.get('email');
  console.log("email---",email)
      const dishes = await dishSchema.find({email});
      return NextResponse.json(dishes, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: "Error fetching dishes", error }, { status: 500 });
    }
  }

export async function PUT(req) {

await dbConnect();

 
    try {
  
  const {id , email, name, description} = await req.json();

      const dishes = await dishSchema.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(id) },
        { name, description},
        {new:true}
      );
      return NextResponse.json({dishes, success: true} ,{ status: 200 });
    } catch (error) {
      return NextResponse.json({ message: "Error fetching dishes", error }, { status: 500 });
    }
  }

  export async function POST(req) {

 


await dbConnect();


console.log("Received POST request");
const data = await req.json();
console.log("Received data:", data);
console.log(data.email)
if(!data.name){
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
let newDish = data;
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


    export async function DELETE(req) {
      await dbConnect();
    
      try {
        const { itemId } = await req.json(); // Get itemId from the request body
        console.log("Deleting dish with itemId:", itemId);
    
        // Check if itemId is provided
        if (!itemId) {
          return NextResponse.json({ message: "itemId is required" }, { status: 400 });
        }

       const id = new mongoose.Types.ObjectId(itemId)
    
        // Find and delete the dish
        const deletedDish = await dishSchema.findOneAndDelete({_id:id});
    
        // Check if the dish was found and deleted
        if (!deletedDish) {
          return NextResponse.json({ message: "Dish not found" }, { status: 404 });
        }
    
        return NextResponse.json({ message: "Dish deleted successfully", deletedDish }, { status: 200 });
      } catch (error) {
        console.error("Error deleting dish:", error);
        return NextResponse.json({ message: "Error deleting dish", error }, { status: 500 });
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