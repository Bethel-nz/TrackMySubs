import { ReactNode } from 'react';
import * as z from 'zod';
const loginFormSchema = z.object({
  email: z.string().email({
    message: 'Invalid email',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters',
  }),
});
const registerFormSchema = z.object({
  name: z.string().min(4, {
    message: 'Name must be at least 4 characters',
  }),
  email: z.string().email({
    message: 'Invalid email',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters',
  }),
});

type props = {
  children: ReactNode;
};

export { loginFormSchema, registerFormSchema };
export { type props };
