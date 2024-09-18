import { ClipboardDocumentListIcon } from '@heroicons/react/20/solid';

export default async function History() {
  return (
    <section className="flex h-screen flex-col items-center justify-center gap-6 md:gap-8">
      <ClipboardDocumentListIcon className="size-8" />
      <span>
        Muy pronto podrás ver el historial de los registros en ésta sección
      </span>
    </section>
  );
}
