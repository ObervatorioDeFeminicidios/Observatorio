import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Republicanas Populares | Centro de Conocimientos y Acción Política',
  description: 'Created by Imakia',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} text-zinc-950 antialiased dark:bg-zinc-900 dark:text-white lg:bg-zinc-100 dark:lg:bg-zinc-950`}
      >
        {children}
      </body>
    </html>
  );
}
