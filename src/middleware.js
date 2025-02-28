import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

export function middleware(request) {
    console.log("middleware-------")
    const token = request.cookies.get('token')?.value;
console.log(token);
    // If no token, redirect to login
    if (!token) {
        return NextResponse.redirect(new URL('/restaurant', request.url));
    }

    try {
        jwt.verify(token, JWT_SECRET); // Verify the JWT token
    } catch (error) {
        return NextResponse.redirect(new URL('/restaurant', request.url));
    }

    return NextResponse.next();
}

// Apply middleware **only** to protected routes
export const config = {
    matcher: ['/dashboard/:path*'],
};