'use client';

import { handleSignOut } from '@/actions/_auth';
import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/solid';
import React, { FormEvent } from 'react';
import { Button } from './ui/button';

export const LogoutButton = () => {
  const [pending, setPending] = React.useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);

    try {
      await handleSignOut();
    } catch (error) {
      console.error('Sign out failed', error);
    } finally {
      setPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Button type="submit" className="bg-primary" disabled={pending}>
        <span className="md:text-md text-xs">Salir</span>
        {!pending ? (
          <ArrowRightStartOnRectangleIcon className="ml-2 h-5 w-5 text-gray-50" />
        ) : (
          <div className="ml-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-primary" />
        )}
      </Button>
    </form>
  );
};
