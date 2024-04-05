'use server';

import { signOut as logOut } from 'auth';

export default async function signOut() {
  await logOut({ redirectTo: '/auth/sign-in', redirect: true });
}
