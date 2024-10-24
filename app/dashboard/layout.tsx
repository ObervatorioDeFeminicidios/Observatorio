import Sidebar from '@/components/Sidebar';
import Providers from '@/util/providers';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-full lg:grid lg:grid-cols-[240px,1fr]">
      <Sidebar />
      <main className="col-start-2 ml-2 mr-2 mt-2 h-[98%] rounded-t-lg border border-gray-300 bg-white px-8 py-6 md:overflow-y-auto lg:ml-0">
        <Providers>{children}</Providers>
      </main>
    </div>
  );
}
