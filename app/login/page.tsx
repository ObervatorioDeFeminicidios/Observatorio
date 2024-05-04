import LoginForm from '@/components/LoginForm';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full min-w-[380px] max-w-[400px] flex-col items-center space-y-2.5 p-4 md:-mt-32">
        <Image
          className="w-auto"
          src="/logoRedFeministaAntimilitarista.png"
          alt="logo red feminista antimilitarista"
          width={250}
          height={92}
        />
        <LoginForm />
      </div>
    </main>
  );
}
