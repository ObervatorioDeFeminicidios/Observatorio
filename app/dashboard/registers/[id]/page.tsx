import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import Registration from "../../registration/page";
import { fetchRegister } from "@/actions/_form";

export default async function RegisterPage({ params }: { params: { id: string } }) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['data', params.id],
    queryFn: async () => {
      const response = await fetchRegister(params.id);
      return response;
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Registration />
    </HydrationBoundary>
  )
}
