'use server';
import prisma from '@/prisma/client';
import { auth } from 'auth';
import moment from 'moment';

export default async function paid_bill(id: string) {
  try {
    const session = await auth();
    const user = session!.user;
    const bill = await prisma.bill.findFirst({
      where: {
        id,
        userId: user?.id,
      },
    });
    return await prisma.bill.update({
      where: { id, userId: user?.id },
      data: {
        isPaid: true,
        nextBillingDate: bill!.isRecurring
          ? moment().add(30, 'days').format()
          : moment().add(1, 'year').format(),
      },
    });
  } catch (e) {
    console.log(e);
  }
}
