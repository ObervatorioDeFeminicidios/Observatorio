import { signOut } from '@/auth';
import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';

export const Header = () => {
  return (
    <header className="inset-x-0 top-0 z-50">
      <nav
        className="container flex items-center justify-between py-2 md:py-4"
        aria-label="navigation"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="p-1.5">
            <span className="sr-only">Red Feminista Antimilitarista</span>
            <Image
              className="h-12 w-auto md:h-16"
              src="/logoRedFeministaAntimilitarista.png"
              alt="logo red feminista antimilitarista"
              width={172}
              height={64}
            />
          </Link>
        </div>

        <div className="flex lg:flex-1 lg:justify-end">
          <form
            action={async () => {
              'use server';
              await signOut();
            }}
          >
            <Button className="bg-primary">
              <span className="md:text-md text-xs">Logout</span>
              <ArrowRightStartOnRectangleIcon className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </div>
      </nav>
    </header>
  );
};
