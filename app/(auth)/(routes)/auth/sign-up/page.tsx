import React from 'react';
import RegisterForm from '@/components/auth/ui/register-form';

import { SparklesView } from '@/components/auth/ui/sparkles-background';

export default function page() {
  return (
    <div className=' h-screen w-screen flex justify-center items-center'>
      <div>
        <SparklesView>
          <RegisterForm />
        </SparklesView>
      </div>
    </div>
  );
}
