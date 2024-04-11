'use client';

import { Bill } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import CellAction from './cell-action';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

export const columns: ColumnDef<Bill>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className={'mr-4'}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'serviceProvider',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Service Provider
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.original.serviceProvider;
      return <div className={'text-center'}>{data.toString()}</div>;
    },
  },
  {
    accessorKey: 'plan',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Plan
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'price',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Price
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('price'));

      return <div className={'text-center'}>${parseFloat(amount)}</div>;
    },
  },
  {
    accessorKey: 'nextBillingDate',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Next Bill Date
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const locale = 'en-US';
      const formatter = new Intl.DateTimeFormat(locale, {
        dateStyle: 'medium',
      }).format(new Date(row.getValue('nextBillingDate')));
      return <div className={'text-center'}>{formatter}</div>;
    },
  },
  {
    accessorKey: 'isRecurring',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className={'self-center'}
        >
          Charged M / Y
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const chargedWhen = row.original;
      return (
        <div className={'text-center'}>
          {chargedWhen ? 'Monthly' : 'Yearly'}
        </div>
      );
    },
  },
  {
    accessorKey: 'notes',
    header: () => {
      return <div className={'text-center'}>Notes</div>;
    },
  },
  {
    accessorKey: 'isPaid',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className={'self-center'}
        >
          Paid Off
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const paidOff = row.original.isPaid;
      return (
        <div className=' flex w-full '>
          {paidOff ? (
            <div className={'size-2 rounded-full mx-auto bg-green-400 '} />
          ) : (
            <div className={'size-2 rounded-full mx-auto bg-red-400 '} />
          )}
        </div>
      );
    },
  },
  {
    header: 'Actions',
    id: 'actions',
    cell: ({ row }) => {
      const bill = row.original;
      return <CellAction data={bill} />;
    },
  },
];
