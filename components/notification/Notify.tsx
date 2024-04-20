'use client'
import { ReactNode, useEffect } from 'react';
import { pusherClient } from '@/utils/pusher';
import { useSession } from 'next-auth/react';
import { SubscriptionReminder } from '@prisma/client';
import { toast } from 'sonner';

export default function Notify({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const userId = session?.user?.id as string;

  useEffect(() => {
    if (userId) {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          pusherClient.subscribe(userId);
          pusherClient.bind('notification', (text: SubscriptionReminder) => {
            new Notification('Update on Bill Expiry', {
              body: `Hi ${text.name}, your ${text.serviceProvider} Plan is about to expire on ${formatDate(text.expiryDate)}.`,
            });
          });
        } else {
          toast(`Notification permission is required to receive alerts.`, {
            action: {
              label: 'Grant Permission',
              onClick: () => Notification.requestPermission(),
            },
          });
        }
      });
    }
    return () => {
      if (userId) {
        pusherClient.unsubscribe(userId);
      }
    };
  }, [userId]);

  return <div>{children}</div>;
}

function formatDate(date: Date) {
  const locale = 'en-US';
  const formatter = new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(new Date(date));
  return formatter;
}