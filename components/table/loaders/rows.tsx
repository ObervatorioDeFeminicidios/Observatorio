import { Skeleton } from '@/components/ui/skeleton';

export const RowLoader = () => {
  return (
    <>
      {[...Array(10)].map((_, i) => (
        <div key={i} className="grid grid-cols-4 gap-4 p-4">
          {[...Array(4)].map((_, j) => (
            <Skeleton key={j} className="h-4 w-full" />
          ))}
        </div>
      ))}
    </>
  );
};
