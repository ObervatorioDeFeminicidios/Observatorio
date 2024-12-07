import { fetchSelectFilters, fetchRegisters } from '@/actions/_form';
import { initialFilters } from '@/components/table/columns';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { DataTable } from './data-table';

export default async function History() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['selectFilters'],
    queryFn: async () => {
      const response = await fetchSelectFilters();
      return response;
    },
    staleTime: 1000 * 60 * 60 * 24,
  });
  await queryClient.prefetchQuery({
    queryKey: ['data', initialFilters],
    queryFn: async () => {
      const response = await fetchRegisters(initialFilters);
      return response;
    },
  });

  return (
    <section className="container mx-auto h-full mb-4">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <DataTable />
      </HydrationBoundary>
    </section>
  );
}
