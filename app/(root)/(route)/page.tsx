import SignoutButton from '@/components/auth/ui/sign-out-button';
import { auth } from 'auth';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function page() {
  const session = await auth();
  if (!session) redirect('/auth/sign-in');
  return (
    <div
      className={'flex justify-center items-center text-3xl h-screen w-screen'}
    >
      <div className={'w-96 flex flex-col justify-center'}>
        <div className='text-center'>
          Welcome <span className='font-bold ml-2'>{session?.user?.name}</span>
        </div>
        <div className='mt-4 w-full'>
          <SignoutButton />
        </div>
      </div>
    </div>
  );
}
