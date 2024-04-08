'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SignOutButton from '@/components/auth/ui/sign-out-button';

export default function NavBar() {
  const path = usePathname();
  return (
    <nav
      className={` border-b-2 border-x-2 py-2 px-2 rounded-b-md max-w-sm md:max-w-xl mx-auto space-evenly items-center ${
        path.includes('/auth') ? 'hidden' : 'flex'
      }`}
    >
      <div className={' w-full'}>
        <h1>
          <Link
            href={'/'}
            className={'text-xl font-bold tracking-tight text-gray-800'}
          >
            TrackMySubs
          </Link>
        </h1>
      </div>
      <div className={' rounded-md  text-white  items-center flex h-full'}>
        
        <SignOutButton />
      </div>
    </nav>
  );
}
