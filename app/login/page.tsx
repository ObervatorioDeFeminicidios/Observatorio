import { Background } from '@/components/Background';
import LoginForm from '@/components/LoginForm';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <Background>
      <main className="flex items-center justify-center md:h-screen">
        <div className="relative mx-auto flex w-full min-w-[380px] max-w-[400px] flex-col items-center gap-4 p-4">
          <Image
            className="w-auto max-w-[150px]"
            src="/logo.png"
            alt="logo republicanas populares"
            width={150}
            height={140}
          />
          <LoginForm />
        </div>
      </main>
    </Background>
  );
}
