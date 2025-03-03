import { NextResponse } from 'next/server';
import { connectionStr } from "@/app/lib/db";
import { restaurantSchema } from "@/app/lib/restaurantsModel";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';

export async function POST(req) {
    try {


        console.log("-------reset password API ----------");
        const { token, newPassword } = await req.json();

        if (!token) {
            return NextResponse.json({ error: "Token is required" }, { status: 400 });
        }
        
        if (!newPassword) {
            return NextResponse.json({ error: "New password is required" }, { status: 400 });
        }

        if (token) {
            console.log("token", token);
            // const decoded= null;
            // try {
            //   //  decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
            //   // console.log("decoded", decoded);

        
            //  console.log(user);
              
            // } catch (err) {
            //   return NextResponse.json({ message: "Invalid or expired token", success: false }, { status: 401 });
            // }
            

              try {
            
             
                  console.log("reset token", token);
                  await mongoose.connect(connectionStr);
                  const user = await restaurantSchema.findOneAndUpdate(
                    { forgetpasswordtoken: token },
                    {
                        password: newPassword,
                        $unset: { forgetpasswordtoken: "" }
                    },
                    { new: true }  // update data
                  );
                  console.log("i am user",user);
                  return NextResponse.json({ message:"successfully resetted password" }, { status: 200 });
              } catch (error) {
                return NextResponse.json({ error: "DB Connection error" }, { status: 500 });

              }

          }
        


        // Find user with a valid reset token
     
        // if (!user || !user.forgetPasswordToken) {
        //     return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
        // }

       console.log('HELLO')
        // return NextResponse.redirect(new URL('/restaurant', req.url));
    } catch (error) {
        console.error("Reset password error:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}