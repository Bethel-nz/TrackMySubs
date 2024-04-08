'use client';

import signIn from '@/actions/auth/sign-in';
import { registerFormSchema } from '@/types/index';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useState } from 'react';
import axios from 'axios';

import { toast } from 'sonner';

import { SparklesCore } from '@/components/ui/sparkles';
import Spinner from '@/components/ui/loader-spinner';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
      const res = await axios.post(`/api/auth/register`, 
        {
          name:values.name,
          email:values.email,
          password:values.password
        }
      );
      if (res.status === 200) {
        const data: { email: string; password: string } = {
          email: values.email,
          password: values.password,
        };
        toast(`welcome ${values.email}`, {
          action: {
            label: 'Dismiss',
            onClick: () => console.log('undo'),
          },
        });
        await signIn(data)
      }
    } catch (e: any) {
      console.log(e);
      
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className='mx-auto max-w-sm md:w-[36em] '>
      <CardHeader>
        <CardTitle className='text-2xl'>Sign Up</CardTitle>
        <CardDescription>Create Your Account - Start Saving</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid gap-4'>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className=' space-y-4 w-full'
            >
              <>
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
              </>
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
                          placeholder='johndoe@mailer.com'
                          {...field}
                          type='text'
                        />
                      </FormControl>

                      <FormMessage className={'text-sm'} />
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
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
              <div className={'mt-8 grid gap-4'}>
                <Button
                  disabled={loading}
                  type='submit'
                  className='w-full bg-black text-white relative hover:bg-black'
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
                    {loading ? <Spinner isLoading={loading} /> : 'Sign up'}
                  </span>
                </Button>
              </div>
            </form>
            <GoogleAuthButton type={'sign-up'} />
          </Form>
        </div>
        <div className={'mt-4 text-center text-sm'}>
          Have an account?{' '}
          <Link href={'/auth/sign-in'} className='underline semibold'>
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
