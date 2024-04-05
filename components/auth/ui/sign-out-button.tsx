'use client';
import signOut from '@/actions/sign-out';
import { Button } from '@/components/ui/button';
import React from 'react';

const SignoutButton = () => {
  return (
    <form action={signOut}>
      <Button className='w-full'>Sign Out</Button>
    </form>
  );
};

export default SignoutButton;
