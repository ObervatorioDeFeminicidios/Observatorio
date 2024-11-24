import Sidebar from '@/components/Sidebar';
import Providers from '@/util/providers';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-full lg:grid lg:grid-cols-[240px,1fr]">
      <Sidebar />
      <main className="col-start-2 mx-2 mt-2 rounded-t-lg border border-gray-300 bg-white px-2 pb-4 pt-2 md:overflow-y-auto lg:mx-0 lg:overflow-y-hidden">
        <Providers>{children}</Providers>
      </main>
    </div>
  );
}
