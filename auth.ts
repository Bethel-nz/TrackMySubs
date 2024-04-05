import NextAuth from 'next-auth';
import config from '@/config/auth.config';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '@/prisma/client';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  ...config,
});
