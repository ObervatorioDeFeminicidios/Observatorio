import { fetchRegisters } from '@/actions/_form';
import { Register } from '@/lib/definitions';
import { columns } from './columns';
import { DataTable } from './data-table';

export default async function History() {
  const registersData: Register[] = await fetchRegisters();

  return (
    <div className="container mx-auto py-2">
      <DataTable columns={columns} data={registersData} />
    </div>
  );
}
