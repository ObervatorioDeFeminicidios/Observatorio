'use client';

import { handleSignOut } from '@/actions/_auth';
import { API_ROUTES } from '@/app/api';
import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import React, { FormEvent } from 'react';
import { Button } from './ui/button';

export const LogoutButton = () => {
  const [pending, setPending] = React.useState(false);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);

    try {
      await handleSignOut();
    } catch (error) {
      console.error('Sign out failed', error);
    } finally {
      setPending(false);
      router.push(API_ROUTES.login);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Button
        type="submit"
        className="flex w-full justify-between bg-primary"
        disabled={pending}
      >
        <span className="text-md font-medium">Salir</span>
        {!pending ? (
          <ArrowRightStartOnRectangleIcon className="ml-2 h-5 w-5 text-gray-50" />
        ) : (
          <div className="ml-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-primary" />
        )}
      </Button>
    </form>
  );
};
