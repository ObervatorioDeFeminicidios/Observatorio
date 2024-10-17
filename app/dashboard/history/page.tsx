import { fetchRegisters } from '@/actions/_form';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { initialPagination } from './columns';
import { DataTable } from './data-table';

export default async function History() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['data', initialPagination],
    queryFn: async () => {
      const response = await fetchRegisters(initialPagination);
      return response;
    },
  });

  return (
    <div className="container mx-auto py-2">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <DataTable />
      </HydrationBoundary>
    </div>
  );
}
