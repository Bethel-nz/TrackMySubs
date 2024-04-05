import React from 'react';
import RegisterForm from '@/components/auth/ui/register-form';

export default function page() {
  return (
    <div className='bg-gradient-to-br from-indigo-600 via-cyan-600 to-teal-200 h-screen w-screen flex justify-center items-center'>
      <div>
        <RegisterForm />
      </div>
    </div>
  );
}
