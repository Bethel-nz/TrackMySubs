import prisma from '@/prisma/client';
import { NextResponse } from 'next/server';
import { auth } from 'auth';
import { billSchema } from '@/types';
import { NextApiRequest, NextApiResponse } from 'next';

export async function GET(req: NextApiRequest & Request, res: NextApiResponse) {
  try {
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
    const allBills = await prisma.bill.findMany({
      where: {
        userId: user!.id as string,
      },
    });
    return NextResponse.json(allBills, { status: 200 });
  } catch (error: any) {
    console.log('Error Occurred', error!.message);
    return NextResponse.json('An error ocurred while creating a bill', {
      status: 500,
    });
  }
}
