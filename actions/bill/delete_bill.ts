'use server';
import prisma from '@/prisma/client';
import { auth } from 'auth';

export default async function delete_bill(id: string) {
  try {
    const session = await auth();
    const user = session!.user;

    return await prisma.bill.delete({
      where: {
        userId: user?.id,
        id,
      },
    });
  } catch (e) {
    console.log(e);
  }
}
