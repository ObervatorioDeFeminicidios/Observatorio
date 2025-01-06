import { Skeleton } from '@/components/ui/skeleton';

export const HeaderLoader = () => {
  return (
    <div className="grid grid-cols-4 gap-4 border-b p-4">
      {[...Array(4)].map((_, i) => (
        <Skeleton key={i} className="h-4 w-full" />
      ))}
    </div>
  );
};
