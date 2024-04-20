'use client';
import React from 'react';
import { billSchema, registerFormSchema } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useRouter } from 'next/navigation';

import axios from 'axios';
import SparklesButton from '@/components/effects/ui/sparkles-button';
import { useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import cn from '@/utils/cn';

import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import Spinner from '@/components/ui/loader-spinner';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export default function NewBillForm() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof billSchema>>({
    resolver: zodResolver(billSchema),
    defaultValues: {
      serviceProvider: '',
      plan: '',
      price: '',
      nextBillingDate: new Date(Date.now()),
      isRecurring: true,
      notes: '',
    },
  });
  async function onSubmit(values: z.infer<typeof billSchema>) {
    setLoading(true);
    try {
      const res = await axios.post(
        `/api/bills/new`,
        JSON.stringify(values)
      );
      if (res.status === 200) {
        toast(`${res.data}`, {
          action: {
            label: 'Dismiss',
            onClick: () => console.log('undo'),
          },
        });
      }
    } catch (e: any) {
      let errorMessage = 'An error occurred, please try again';
      if (e!.response && e!.response.data.message) {
        errorMessage = e!.response.data.message;
      }
      toast(errorMessage, {
        action: {
          label: 'Dismiss',
          onClick: () => console.log('undo'),
        },
      });
      console.log(e);
    } finally {
      setLoading(false);
      router.refresh();
    }
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={'space-y-3'}>
          <FormField
            control={form.control}
            name='serviceProvider'
            render={({ field }) => (
              <FormItem>
                <FormLabel className={'font-semibold'}>
                  Service Provider:
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder='Subscription Service Provider'
                    {...field}
                    type={'text'}
                  />
                </FormControl>
                <FormDescription>
                  Netflix, Prime, Apple Music e.t.c
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='plan'
            render={({ field }) => (
              <FormItem>
                <FormLabel className={'font-semibold'}>Plan Type:</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder='Premium, Basic '
                    {...field}
                    type={'text'}
                  />
                </FormControl>
                <FormDescription>Premium, Basic, e.t.c</FormDescription>
              </FormItem>
            )}
          />
          <div className={'grid grid-cols-3 gap-2 w-full '}>
            <div className={'col-span-1'}>
              <FormField
                control={form.control}
                name='price'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={'font-semibold'}>Price:</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder='price'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>$29.99</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className={'col-span-2 '}>
              <FormField
                control={form.control}
                name='nextBillingDate'
                render={({ field }) => (
                  <FormItem className='flex flex-col space-between w-full pt-2'>
                    <FormLabel className={'font-semibold mb-[0.24em]'}>
                      Next Billing Date
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              ' pl-3 text-left font-normal ',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='w-auto ' align='start'>
                        <Calendar
                          mode='single'
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={loading}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>Your Next Billing Date</FormDescription>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormField
            control={form.control}
            name='notes'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Note</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Add any additional details, special promo codes, or reminders about this subscription.'
                    className='resize-none'
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='isRecurring'
            render={({ field }) => (
              <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow'>
                <FormControl>
                  <Checkbox
                    disabled={loading}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className='space-y-1 leading-none'>
                  <FormLabel>Recurring Bill - Monthly | Yearly</FormLabel>
                  <FormDescription>
                    <span className={'hidden md:block'}>
                      Choose monthly or yearly automatic renewal.
                    </span>
                    <span>Default Checked - Monthly</span>
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <div>
            <SparklesButton>
              <div className={loading ? 'block' : 'hidden'}>
                <Spinner isLoading={loading} />
              </div>
              <span className={loading ? 'hidden' : 'block'}>Submit</span>
            </SparklesButton>
          </div>
        </form>
      </Form>
    </div>
  );
}
