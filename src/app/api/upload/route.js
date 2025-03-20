import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { dbConnect } from "@/app/lib/dbConnect";
import { restaurantSchema } from "@/app/lib/restaurantsModel";

export async function POST(req) {
    const formData = await req.formData();
    const file = formData.get("file");
    const email = formData.get("email");


    if (!file) {
        return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Define the upload directory
    const uploadDir = path.join(process.cwd(), "public/uploads");

    // Ensure the directory exists
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }
    try {
        // Save the file
        const filePath = path.join(uploadDir, file.name);
        fs.writeFileSync(filePath, buffer);
        dbConnect();
        console.log("email-upload", email)
        const updatedUser = await restaurantSchema.findOneAndUpdate(
            { email },
            { profileUrl: `/uploads/${file.name}` },
            { new: true }
        );


    } catch (error) {
        return NextResponse.json({ success: false, message: error.message })
    }


    return NextResponse.json({
        success: true,
        message: "File uploaded successfully",
        url: `/uploads/${file.name}`, // Accessible via public/uploads
    });
}


export async function GET(req) {
    const email = req.headers.get("email");
    console.log("email-upload-api", email)
    if (!email) {
        return NextResponse.json({ success: false, message: "no email provided" })
    }
    dbConnect();
    let url = null
    try {
        const data = await restaurantSchema.findOne({ email });
        url = data.profileUrl;
        console.log(data)
        console.log("upload-api-url", url)

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message
        })
    }
    return NextResponse.json({
        success: true,
        url: url
    })
}