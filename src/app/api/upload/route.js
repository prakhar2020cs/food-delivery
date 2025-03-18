import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file");

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
} catch (error) {
    return NextResponse.json({success:false, message:error})
}
 

  return NextResponse.json({
    success:true,
    message: "File uploaded successfully",
    url: `/uploads/${file.name}`, // Accessible via public/uploads
  });
}
