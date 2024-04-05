'use server';
import { signIn } from 'auth';

export default async function googleAuthAction() {
  await signIn('google', {
    redirect: true,
    redirectTo: `/`,
  });
}
