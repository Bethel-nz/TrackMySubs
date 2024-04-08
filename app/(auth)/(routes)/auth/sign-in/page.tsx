import React from 'react';
import LoginForm from '@/components/auth/ui/login-form';
import { SparklesView } from '@/components/auth/ui/sparkles-background';

export default function page() {
  return (
    <div className=' h-screen w-screen flex justify-center items-center'>
      <div>
        <SparklesView>
          <LoginForm />
        </SparklesView>
      </div>
    </div>
  );
}
