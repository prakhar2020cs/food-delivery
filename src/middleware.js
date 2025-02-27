import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(req) {
    console.log("middleware----------");
    // Get token from cookies or headers
    const token = req.headers.get("auth-token"); //
    console.log(token)
    if (token) {
        console.log("token-middleware",token);
        try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
          return NextResponse.next();
        } catch (err) {
            return NextResponse.redirect(new URL('/restaurant', req.url));
        }
      }
  else{

    console.log("middleware----------");
        return NextResponse.redirect(new URL('/restaurant', req.url));
    }

   
}

// Apply middleware only to the `/dashboard` route and its subroutes
export const config = {
    matcher: ['/dashboard/:path*', '/api/login']
};