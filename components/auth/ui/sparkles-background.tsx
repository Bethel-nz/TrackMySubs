'use client';
import React, { ReactNode } from 'react';
import { SparklesCore } from '@/components/ui/sparkles';

export function SparklesView({ children }: { children: ReactNode }) {
  return (
    <div className='h-screen w-screen relative  bg-black flex flex-col items-center justify-center overflow-hidden rounded-md'>
      <div className='w-full absolute inset-0 h-screen'>
        <SparklesCore
          id='tsparticlesfullpage'
          background='transparent'
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className='w-full h-full'
          particleColor='#FFFFFF'
        />
      </div>
      <div className='relative z-20'>{children}</div>
    </div>
  );
}
