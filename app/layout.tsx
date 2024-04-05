import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Auth v5 playground',
  description: 'a playground for next auth v5',
  authors: [
    {
      name: 'bethel nzekea',
      url: 'https://github.com/Bethel-nz',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.className} antialiased`}>{children}</body>
      <Toaster />
    </html>
  );
}
