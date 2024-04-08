import prisma from '@/prisma/client';
const bcrypt = require('bcryptjs');
import { NextResponse } from 'next/server';

/**
 * Handles a POST request to create a new user.
 *
 * @param req - The request object containing the user data in the request body.
 * @returns A JSON response with the created user's data or an error message.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;
    console.log(body,'user from values',name)
    const hashPassword: string = await bcrypt.hash(password, 10);
    const exists = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (exists) {
      return NextResponse.json('User already exists', { status: 409 });
    }
    const user = await prisma.user.create({
      data: {
        email: email,
        password: hashPassword,
        name,
        emailVerified: new Date(),
      },
    });
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(error);
  }
}
