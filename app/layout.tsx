import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import NavBar from '@/components/ui/nav-bar';
import SessionWrapper from '@/context/SessionWrapper';
import Notify from '@/components/notification/Notify';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title:  'Track My Subs',
  description: 'Track My Subs: Manage your subscriptions, stay on budget',

  keywords: [
    'personal finance',
    'subscription',
    'tracker',
    'manage',
    'budget',
    'reminders',
    'save',
    'organize',
    'cost',
    'finance',
    'renewal',
  ],
  authors: [
    {
      name: 'bethel nzekea',
      url: 'https://github.com/Bethel-nz',
    },
  ],

  openGraph: {
    type: 'website',
    siteName: 'Track My Subs',
    title: { default: 'Track My Subs', template: '%s - TMS App' },

    description: 'Track My Subs: Manage your subscriptions, stay on budget',
  },
  twitter: {
    card: 'summary',
    title: { default: 'Track My Subs', template: '%s - TMS App' },

    description: 'Track My Subs: Manage your subscriptions, stay on budget',
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.className} antialiased`}>
        <SessionWrapper>
          <main>
            <NavBar />
            <Notify>{children}</Notify>
          </main>
        </SessionWrapper>
        <Toaster />
      </body>
    </html>
  );
}
