import Image from 'next/image';
import Link from 'next/link';
import { LogoutButton } from './LogoutButton';

export const Header = () => {
  return (
    <header className="inset-x-0 top-0 z-50">
      <nav
        className="container flex items-center justify-between py-2 md:py-4"
        aria-label="navigation"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="p-1.5" legacyBehavior>
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
          <LogoutButton />
        </div>
      </nav>
    </header>
  );
};
