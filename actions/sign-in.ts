'use server';

import { signIn as Login } from '@/auth';
import * as z from 'zod';
import { loginFormSchema } from '@/types';

export default async function signIn(data: z.infer<typeof loginFormSchema>) {
  await Login('credentials', {
    email: data.email,
    password: data.password,
    callbackUrl: `/auth/sign-in`,
    redirect: true,
    redirectTo: `/`,
  });
}
