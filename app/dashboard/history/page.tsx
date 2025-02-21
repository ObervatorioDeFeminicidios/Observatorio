import { fetchSelectFilters, fetchRegisters } from '@/actions/_form';
import { initialFilters } from '@/components/table/columns';
import {
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';
import { DataTable } from './data-table';
import { getQueryClient } from '@/util/get-query-client';

export default async function History() {
  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['selectFilters'],
      queryFn: () => fetchSelectFilters(),
      staleTime: 1000 * 60 * 60 * 24, // 24 hours
    }),
    queryClient.prefetchQuery({
      queryKey: ['data', initialFilters],
      queryFn: () => fetchRegisters(initialFilters),
    })
  ]);

  return (
    <section className="container mx-auto h-full mb-4">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <DataTable />
      </HydrationBoundary>
    </section>
  );
}
