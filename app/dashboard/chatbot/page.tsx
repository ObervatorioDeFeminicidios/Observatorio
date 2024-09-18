import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/20/solid';

export default async function Chatbot() {
  return (
    <section className="flex h-screen flex-col items-center justify-center gap-6 md:gap-8">
      <ChatBubbleOvalLeftEllipsisIcon className="size-8" />
      <span>
        Muy pronto podrás realizar preguntas a la base de datos para extraer
        información puntual
      </span>
    </section>
  );
}
