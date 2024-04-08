'use client';
import { ReactNode } from 'react';
import { Drawer } from 'vaul';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function VaulDrawer({
  trigger,
  title,
  children,
}: {
  trigger?: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <Drawer.Root shouldScaleBackground>
      <Drawer.Trigger asChild>{trigger}</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className='fixed inset-0 bg-black/40' />
        <Drawer.Content className='bg-zinc-100 flex flex-col rounded-t-[10px] h-[90%] mt-24 fixed bottom-0 left-0 right-0'>
          <div className='p-4 bg-white rounded-t-[10px] flex-1'>
            <div className='mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8' />
            <div className='max-w-md mx-auto'>
              <Drawer.Title className='font-medium mb-3'>
                <div className='font-bold text-lg md:text-2xl text-center'>
                  {title}
                </div>
                <Separator />
              </Drawer.Title>
              <div className={'h-full '}>{children}</div>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
