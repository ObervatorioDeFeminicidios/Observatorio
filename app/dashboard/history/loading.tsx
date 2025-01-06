import { HeaderLoader } from '@/components/table/loaders/headers';
import { RowLoader } from '@/components/table/loaders/rows';

export default function Loading() {
  return (
    <div className="space-y-4">
      {/* Table skeleton */}
      <div className="rounded-sm border">
        <HeaderLoader />
        <RowLoader />
      </div>
    </div>
  );
}
