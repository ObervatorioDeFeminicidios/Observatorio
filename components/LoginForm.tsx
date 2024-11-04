'use client';

import { authenticate } from '@/actions/_auth';
import { API_ROUTES } from '@/app/api';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import {
  AtSymbolIcon,
  ExclamationCircleIcon,
  KeyIcon,
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { useFormState, useFormStatus } from 'react-dom';

export default function LoginForm() {
  const router = useRouter();
  const [errorMessage, dispatch] = useFormState(
    async (prevState: string | undefined, formData: FormData) => {
      const error = await authenticate(prevState, formData);
      if (!error) router.push(API_ROUTES.registration);
      return error;
    },
    undefined,
  );

  return (
    <form action={dispatch} className="w-full space-y-3">
      <div className="flex flex-1 flex-col gap-8 rounded-lg bg-gray-50 px-6 py-8">
        <p className="text-md text-primary-foreground">
          Por favor, ingresa para continuar
        </p>
        <div className="flex w-full flex-col gap-4">
          <div>
            <label
              className="mb-3 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div>
            <label
              className="mb-3 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        {errorMessage && (
          <div
            className="flex items-end space-x-1 text-destructive"
            aria-live="polite"
            aria-atomic="true"
          >
            <ExclamationCircleIcon className="h-5 w-5" />
            <p className="text-sm">{errorMessage}</p>
          </div>
        )}
        <LoginButton />
      </div>
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="w-full" disabled={pending} aria-disabled={pending}>
      Ingresar
      {!pending ? (
        <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
      ) : (
        <div className="ml-auto h-5 w-5 animate-spin rounded-full border-2 border-white border-t-primary" />
      )}
    </Button>
  );
}
