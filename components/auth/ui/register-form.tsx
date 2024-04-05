'use client';

import signIn from '@/actions/sign-in';
import { registerFormSchema } from '@/types/index';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import GoogleAuthButton from './google-auth-button';
import Link from 'next/link';

export default function RegisterForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  });

  async function onSubmit(values: z.infer<typeof registerFormSchema>) {
    setLoading(true);
    try {
      const res = await fetch(`${window.location.origin}/api/auth/register`, {
        method: 'POST',
        body: JSON.stringify(values),
      });
      if (res.ok) {
        const data: { email: string; password: string } = {
          email: values.email,
          password: values.password,
        };
        await signIn(data);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='w-96  bg-white rounded-md flex flex-col p-4'>
      <div className={'text-2xl text-center mb-4'}>
        <p className='font-bold mb-2'>Sign Up</p>
        <Separator />
      </div>
      <div className='mt-2'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=' space-y-8 w-full'
          >
            <div className={'space-y-4'}>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={'font-semibold'}>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder='john doe'
                        {...field}
                        type='text'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={'font-semibold'}>Email</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder='johndoe@testauth.com'
                        {...field}
                        type='text'
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='font-semibold'>Password</FormLabel>

                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder='12Kl***r0'
                        {...field}
                        type='password'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <Button disabled={loading} type='submit' className='w-full'>
                Submit
              </Button>
            </div>
            <div className={'flex gap-2 justify-center w-full'}>
              <span>Have An Account? </span>
              <span>
                <Link
                  href={'/auth/sign-in'}
                  className='font-semibold text-gray-900'
                >
                  Sign in here
                </Link>
              </span>
            </div>
          </form>
        </Form>
      </div>
      <Separator />
      <div className='mt-4'>
        <GoogleAuthButton />
      </div>
    </div>
  );
}
