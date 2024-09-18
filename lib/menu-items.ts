import {
  ChatBubbleOvalLeftEllipsisIcon,
  ClipboardDocumentListIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/outline';

export type MenuItem = {
  icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, 'ref'> & {
      title?: string;
      titleId?: string;
    } & React.RefAttributes<SVGSVGElement>
  >;
  name: 'Agregar' | 'Historial' | 'Chatbot';
  route:
    | '/dashboard/registration'
    | '/dashboard/history'
    | '/dashboard/chatbot';
};

export const menuItems: Array<MenuItem> = [
  {
    icon: PlusCircleIcon,
    name: 'Agregar',
    route: '/dashboard/registration',
  },
  {
    icon: ClipboardDocumentListIcon,
    name: 'Historial',
    route: '/dashboard/history',
  },
  {
    icon: ChatBubbleOvalLeftEllipsisIcon,
    name: 'Chatbot',
    route: '/dashboard/chatbot',
  },
];
