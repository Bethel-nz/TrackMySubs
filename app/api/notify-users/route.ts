import prisma from '@/prisma/client';
import { NextResponse } from 'next/server';
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { pusherServer } from '@/utils/pusher';
import moment from 'moment';
import { Bill } from '@prisma/client';

export async function GET() {
  try {
    const bills = await prisma.bill.findMany({
      where: {
        nextBillingDate: {
          gte: moment().toDate(),
          lt: moment().add(7, 'days').toDate(),
        },
      },
      include: {
        user: true,
      },
    });

    const billsGroupedByUserId = Object.values(
      bills.reduce((acc: { [userId: string]: Bill[] }, bill: Bill) => {
        acc[bill.userId] = acc[bill.userId] || [];
        acc[bill.userId].push(bill);
        return acc;
      }, {})
    );

    const convertDecimalToNumber = (decimal: any): number => {
      return parseFloat(decimal.unsignedInt + '.' + decimal.unsignedIntNano);
    };
    const remindersToCreate = billsGroupedByUserId.map((billsForUser: any) => {
      return {
        name: billsForUser[0].user.name as string,
        plan: billsForUser[0].plan as string,
        serviceProvider: billsForUser[0].serviceProvider as string,
        expiryDate: billsForUser[0].nextBillingDate,
        userId: billsForUser[0].userId,
        notes: billsForUser[0].notes,
        price: billsForUser.reduce((total: number, bill: Bill) => {
          const price = total + convertDecimalToNumber(bill.price);
          return price;
        }, 0),
      };
    });

    await prisma.bill.updateMany({
      where: {
        nextBillingDate: {
          gte: moment().toDate(),
          lt: moment().add(7, 'days').toDate(),
        },
        isPaid: true,
      },
      data: {
        isPaid: false,
      },
    });

    await prisma.subscriptionReminder.createMany({
      data: remindersToCreate,
    });

    const reminders = await prisma.subscriptionReminder.findMany({
      where: {
        notified: false,
      },
    });

    for (const reminder of reminders) {
      await prisma.subscriptionReminder.update({
        where: { id: reminder.id },
        data: { notified: true },
      });
      await pusherServer.trigger(reminder.userId, 'notification', reminder);
      if (moment().isAfter(moment(reminder.createdAt).add(7, 'days'))) {
        await prisma.subscriptionReminder.delete({
          where: { id: reminder.id, notified: true },
        });
      }
    }

    return NextResponse.json({
      message: 'Subscriptions checked and notifications sent',
      reminders,
    });
  } catch (error: any) {
    console.error('Error in check-subscriptions:', error);
    return NextResponse.json({ message: 'An error occurred' });
  }
}
