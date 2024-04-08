import { Button } from '@/components/ui/button';
import { SparklesCore } from '@/components/ui/sparkles';

import React, { ButtonHTMLAttributes, ReactNode } from 'react';

export default function SparklesButton({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
}) {
  return (
    <Button
      type='submit'
      className='w-full bg-black text-white relative text-center flex flex-row items-center justify-center'
      {...props}
    >
      <span className={'absolute inset-0 w-full'}>
        <SparklesCore
          id='tsparticles'
          background='transparent'
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className='w-full h-full'
          particleColor='#FFFFFF'
        />
      </span>
      <span className={'relative flex w-fit gap-4 items-center'}>
        {children}
      </span>
    </Button>
  );
}
