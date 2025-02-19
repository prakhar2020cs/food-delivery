import { connectionStr } from "@/app/lib/db";
import { restaurantSchema } from "@/app/lib/restaurantsModel";
import mongoose from "mongoose";

import { NextResponse } from "next/server";

export async function GET(request){
    await mongoose.connect(connectionStr,{useNewUrlParser:true});
    const {searchParams} = new URL(request.url);
    const userEmail =  searchParams.get('email');
    console.log("userEmail",userEmail)
    let data;
    if(userEmail){
        data = await restaurantSchema.findOne({ email: userEmail });
                 console.log("data connection",data);
    }else{
        return NextResponse.json({message:'Email is required to find the user'},{status:400});
    }

    if(!data){
        return NextResponse.json({message:'user not found', success:'false'}, {status:'404'});
    }

    return NextResponse.json({ user: data, success: true });
}

export async function POST(request){
  
    let payload = await request.json();
    console.log("payload",payload);
 await mongoose.connect(connectionStr,{useNewUrlParser:true});
 let restaurant = new restaurantSchema(payload);
 const result = await restaurant.save();
 console.log("result full data",result);


    return NextResponse.json({result,success:true})
}