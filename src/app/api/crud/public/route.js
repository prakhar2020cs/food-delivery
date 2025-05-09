import { dbConnect } from "@/app/lib/dbConnect";
import dishSchema from "@/app/lib/dishesModel";

import { NextResponse } from "next/server";

export async function GET(req){
dbConnect();
const {searchParams} = new URL(req.url) ;
const dish = searchParams.get("dish")

const dishes = await dishSchema.find({name:{ $regex: dish, $options: "i" }});
console.log(dishes);
return NextResponse.json({dishes ,success:true})
}