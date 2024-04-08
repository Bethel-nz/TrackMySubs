'use client';

import signIn from '@/actions/auth/sign-in';
import { loginFormSchema } from '@/types/index';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useState } from 'react';
import { toast } from 'sonner';

import { SparklesCore } from '@/components/ui/sparkles';
import Spinner from '@/components/ui/loader-spinner';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import GoogleAuthButton from './google-auth-button';
import Link from 'next/link';
import InvalidCredentialsError from '@/lib/error.auth';

export default function LoginForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    try {
      setLoading(true);
      await signIn(values).then((e)=>console.log(e))
    } catch (e) {
      if (e) {
        toast('Invalid credentials or Network error', {
          action: {
            label: 'Dismiss',
            onClick: () => console.log('undo'),
          },
        });
      }
      console.log(e)
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className='mx-auto max-w-sm md:max-w-[32em]'>
      <CardHeader>
        <CardTitle className='text-2xl'>Login</CardTitle>
        <CardDescription>
          Access Your Account - Manage Subscriptions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className={'grid gap-4'}>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className=' space-y-4 w-full'
            >
              <>
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
              </>
              <>
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
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            </form>
              <div className={'mt-8 grid gap-4'}>
                <Button
                  disabled={loading}
                  type='submit'
                  className='w-full bg-black text-white relative'
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
                  <span className={'relative z-20'}>
                    {loading ? <Spinner isLoading={loading} /> : 'Sign in'}
                  </span>
                </Button>
                <GoogleAuthButton type={'sign-in'} />
              </div>
          </Form>
        </div>
        <div className={'mt-4 text-center text-sm'}>
          Don&apos;t have an account?{' '}
          <Link href={'/auth/sign-up'} className='underline semibold'>
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
