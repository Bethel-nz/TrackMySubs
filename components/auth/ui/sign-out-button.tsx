'use client';
import signOut from '@/actions/auth/sign-out';
import { Button } from '@/components/ui/button';
import React from 'react';

const SignOutButton = () => {
  return (
    <form action={signOut}>
      <Button className='w-fit bg-black' >Sign Out</Button>
    </form>
  );
};

export default SignOutButton;
