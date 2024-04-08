import type { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { NextResponse } from 'next/server';
import GoogleProvider from '@auth/core/providers/google';
import prisma from '../prisma/client';
const bcrypt = require('bcryptjs');

import InvalidCredentialsError from '@/lib/error.auth';
export default {
  session: {
    strategy: 'jwt',
    maxAge: 14 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  pages: {
    signIn: '/auth/sign-in',
    newUser: '/auth/sign-up',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'johndoe@gmail.com',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: '1234***',
        },
      },

      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email as string,
          },
        });
        if (!user) {
          return NextResponse.json({ message: 'User not found' }) && null;
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password as string,
          user.password as string
        );
        if (!passwordMatch)
          throw new InvalidCredentialsError('Invalid Credentials');

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return { ...token, id: user.id, email: user.email, name: user.name };
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        return {
          ...session,
          user: {
            ...token,
          },
        };
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
      const protectedRoutes = ['/middlewareProtected']; // specify routes you want to protect in this array
      if (protectedRoutes.includes(pathname)) return !!auth;
      return true;
    },
  },
} satisfies NextAuthConfig;
