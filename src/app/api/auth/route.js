import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  const { username, password } = await request.json();

  // Example user authentication (replace with real logic)
  if (username === 'user' && password === 'password') {
    const token = jwt.sign(
      { username },
      process.env.JWT_SECRET, // Secret from environment variables
      { expiresIn: '1h' }
    );

    return NextResponse.json({ token });
  }

  return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
}
