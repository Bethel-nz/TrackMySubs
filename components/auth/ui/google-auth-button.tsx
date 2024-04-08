import React from 'react';
import { Button } from '@/components/ui/button';
import googleAuthAction from '@/actions/auth/google-auth-action';

const GoogleAuthButton = ({ type }: { type: 'sign-in' | 'sign-up' }) => {
  return (
    <form action={googleAuthAction}>
      <Button className={'flex w-full gap-4'} variant={'outline'}>
        <span className={'text-md font-semibold'}>
          {type === 'sign-in' ? 'Sign in' : 'Sign up'} with google
        </span>
      </Button>
    </form>
  );
};

export default GoogleAuthButton;
