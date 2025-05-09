import { NextResponse } from 'next/server';
// import jwt from 'jsonwebtoken';

// const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

export function middleware(request) {
    console.log("middleware-------")
    const token = request.cookies.get('token')?.value;
     console.log("middleware token",token);
    // If no token, redirect to login
// console.log("requrl", request.url);
    // if(request.url === "http://localhost:3000/dashboard" && token){
    //     return NextResponse.redirect(new URL('/dashboard', request.url));
    // }
    // if()
    if (!token) {
        return NextResponse.redirect(new URL('/restaurant', request.url));
    }

    // try {
    //   const decode = jwt.verify(token, JWT_SECRET); // Verify the JWT token
    //     console.log(decode);
    // } catch (error) {
    //     console.log(error)
    //     // return NextResponse.redirect(new URL('/restaurant', request.url));
    // }

    return NextResponse.next();
}

// Apply middleware **only** to protected routes
export const config = {
    matcher: ['/dashboard'],
};

