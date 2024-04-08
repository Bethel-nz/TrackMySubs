import { auth } from 'auth';
import { redirect } from 'next/navigation';
import React from 'react';
import greetByHour from '@/utils/greet-by-hour';
import VaulDrawer from '@/components/ui/vaul-drawer';

import { Drawer } from 'vaul';
import NewBillForm from '@/components/bills/ui/new-bill-form';

import { Plus } from 'lucide-react';
import SparklesButton from '@/components/effects/ui/sparkles-button';
import Table from '@/components/bills/ui/table/ui/table';

export default async function page() {
  let message = greetByHour();
  const session = await auth();
  if (!session) redirect('/auth/sign-in');
  return (
    <>
      <div className={'flex flex-col h-screen mx-auto mt-2 text-gray-900 px-6'}>
        <div className='flex flex-row space-between w-full items-center  p-2'>
          <div className=' w-full '>
            <p className={'text-2xl'}>
              {message},{' '}
              <span className={'font-bold'}>
                <>{session!.user?.name}</>
              </span>
            </p>
            <span className={'text-gray-700 text-md'}>
              {`Here's`} a list of your upcoming {`bill's`}
            </span>
          </div>
          <div className={''}>
            <VaulDrawer
              title={'Add New Bill'}
              trigger={
                <SparklesButton>
                  <Plus className='mr-2 size-4 ' />
                  <p>Add New Bill</p>
                </SparklesButton>
              }
            >
              <NewBillForm />
            </VaulDrawer>
          </div>
        </div>
        <div>
          <Table />
        </div>
      </div>
    </>
  );
}
