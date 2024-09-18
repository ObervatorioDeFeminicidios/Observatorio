import { Background } from '@/components/Background';
import Sidebar from '@/components/Sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  // TODO: Implement the responsive design
  return (
    <div className="grid h-screen w-full grid-cols-[240px,1fr]">
      <Sidebar />
      <main className="col-start-2 mr-2 mt-2 rounded-t-lg border border-gray-300 bg-white px-8 py-6 md:overflow-y-auto">
        <Background>{children}</Background>
      </main>
    </div>
  );
}
