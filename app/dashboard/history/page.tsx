import { fetchRegisters } from '@/actions/_form';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { PaginationState } from '@tanstack/react-table';
import { DataTable } from './data-table';

export const initialPagination: PaginationState = { pageIndex: 0, pageSize: 10 };

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
