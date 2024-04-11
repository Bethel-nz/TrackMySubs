import prisma from '@/prisma/client';
import { NextResponse } from 'next/server';
import { auth } from 'auth';
import { billSchema } from '@/types';
import { NextApiRequest, NextApiResponse } from 'next';
import {  Prisma } from '@prisma/client'

export async function POST(
  req: NextApiRequest & Request,
  res: NextApiResponse
) {
  try {
    const body = await req.json();
    const {
      serviceProvider,
      plan,
      price,
      nextBillingDate,
      isRecurring,
      notes,
    } = body;
    const session = await auth();
    const user = session!.user;
    if (!session)
      return NextResponse.json(
        'You are not authorized to access this, Sign in to access it',
        {
          status: 400,
        }
      );
    if (!user)
      return NextResponse.json('You need to be logged in to get access', {
        status: 400,
      });
    const createdBill = await prisma.bill.create({
      data: {
        serviceProvider,
        plan,
        price:new Prisma.Decimal(price),
        nextBillingDate,
        isRecurring,
        notes,
        userId: user!.id as string,
      },
    });
    return NextResponse.json('Bill Created', { status: 200 });
  } catch (error: any) {
    console.log('Error Occurred', error!.message);
    return NextResponse.json('An error ocurred while creating a bill', {
      status: 500,
    });
  }
}
