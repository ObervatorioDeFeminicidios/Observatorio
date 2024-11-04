'use server';

import { API_ROUTES } from '@/app/api';
import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';

// Sign-in function with error handling and redirection
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    // Handles custom error types or general errors
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error; // Throws other errors for handling elsewhere
  }
}

// Sign-out function with redirection
export async function handleSignOut() {
  await signOut({
    redirect: true,
    redirectTo: API_ROUTES.login,
  });
}
