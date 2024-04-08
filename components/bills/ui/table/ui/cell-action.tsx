'use client';

import { Bill } from '@prisma/client';
import axios from 'axios';
import { useState } from 'react';
import delete_bill from '@/actions/bill/delete_bill';
import paid_bill from '@/actions/bill/paid_bill';
import { Copy, Edit, MoreHorizontal, Check, Trash } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { billSchema } from '@/types';
import VaulDrawer from '@/components/ui/vaul-drawer';

export default function CellAction({ data }: { data: Bill }) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const onPaid = async (id: string) => {
    try {
      setLoading(true);
      const res = await paid_bill(id);
      if (await res) {
        toast(`Bill Marked As Paid - Next Billing in 30 days`, {
          action: {
            label: 'Dismiss',
            onClick: () => console.log('undo'),
          },
        });
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      router.refresh();
      setLoading(false);
    }
  };
  const onDelete = async (id: string) => {
    try {
      setLoading(true);
      const res = delete_bill(id);
      if (await res) {
        toast(` Bill record deleted`, {
          action: {
            label: 'Dismiss',
            onClick: () => console.log('undo'),
          },
        });
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
      router.refresh();
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onPaid(data.id)}>
            <Check className='mr-2 h-4 w-4' /> Paid
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => onDelete(data.id)}>
            <Trash className='mr-2 h-4 w-4' /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
