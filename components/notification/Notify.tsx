'use client';
import { ReactNode, useEffect, useState } from 'react';
import { pusherClient } from '@/utils/pusher';
import { useSession } from 'next-auth/react';
import { SubscriptionReminder } from '@prisma/client';
import { toast } from 'sonner';

export default function Notify({ children }: { children: ReactNode }) {

  const { data: session } = useSession();
  const userId = session?.user?.id as string;

  useEffect(() => {
    if (userId) {
      pusherClient.subscribe(userId);
      pusherClient.bind('notification', (text:SubscriptionReminder ) => {
       Notification.requestPermission().then(permission =>{
        if(permission === 'granted'){
          new Notification('Update on Bill Expiry',{
            body:`Hi ${text.name} your ${text.serviceProvider} Plan is about to expire on ${formatDate(text.expiryDate)}`
          })
        }else{
            toast(`Missed a notification, you need to grant access`, {
          action: {
            label: 'Dismiss',
            onClick: () => console.log('undo'),
          },
        });
        }
       })
      });
    }

    return () => {
      pusherClient.unsubscribe(userId);
    };
  }, [userId]);

  return <div>{children}</div>;
}

function formatDate(date: Date){
    const locale = 'en-US';
      const formatter = new Intl.DateTimeFormat(locale, {
        dateStyle: 'medium',
      }).format(new Date(date));
  return formatter;
}