import React from 'react';
import axios from 'axios';
import { auth } from 'auth';
import prisma from '@/prisma/client';
import { DataTable } from './data-table';
import { columns } from './columns';
// import { unstable_noStore as noStore } from 'next/cache';

export const dynamic = 'force-dynamic';

export default async function Table() {
  const session = await auth();
  const data = await prisma.bill.findMany({
    where: {
      userId: session!.user?.id,
    },
  });

  return (
    <div>
      <DataTable columns={columns} data={data} searchKey={'serviceProvider'} />
    </div>
  );
}
