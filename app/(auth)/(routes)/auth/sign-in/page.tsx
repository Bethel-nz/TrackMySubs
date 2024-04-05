import React from 'react';
import LoginForm from '@/components/auth/ui/login-form';

export default function page() {
  return (
    <div className='bg-gradient-to-t from-blue-700 via-violet-500 to-violet-500 h-screen w-screen flex justify-center items-center'>
      <div>
        <LoginForm />
      </div>
    </div>
  );
}
