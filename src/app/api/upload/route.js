import { NextResponse } from "next/server";
import { restaurantSchema } from "/src/app/lib/restaurantsModel"; // adjust path
import dbConnect from "/src/app/lib/dbConnect";

export async function POST(req) {
  try {
    const { email, profileUrl } = await req.json();

    if (!email || !profileUrl) {
      return NextResponse.json({ message: "Missing data" }, { status: 400 });
    }

    await dbConnect();
    const updatedUser = await restaurantSchema.findOneAndUpdate(
      { email },
      { profileUrl },
      { new: true }
    );

    return NextResponse.json({ success: true, data: updatedUser });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
