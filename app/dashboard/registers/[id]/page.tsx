import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import Registration from "../../registration/page";
import { fetchRegister } from "@/actions/_form";
import { getQueryClient } from "@/util/get-query-client";

export default async function RegisterPage({ params }: { params: { id: string } }) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['register', params.id],
    queryFn: async () => fetchRegister(params.id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Registration />
    </HydrationBoundary>
  )
}
