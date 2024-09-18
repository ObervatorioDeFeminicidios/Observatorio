'use client';

import { MenuItem, menuItems } from '@/lib/menu-items';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { LogoutButton } from './LogoutButton';
import { Button } from './ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

// TODO: Implement the collapse state with tooltip
const SidebarItem: React.FC<{
  menuItem: MenuItem;
  sidebarIsExpanded: boolean;
}> = ({ menuItem, sidebarIsExpanded }) => {
  const pathname = usePathname();

  return (
    <TooltipProvider>
      <Tooltip key={menuItem.name}>
        <TooltipTrigger asChild>
          <Button asChild variant="ghost">
            {sidebarIsExpanded && (
              <Link href={menuItem.route} passHref legacyBehavior>
                <a
                  className={`text-md flex items-center justify-start gap-2 rounded-lg px-2 py-2.5  hover:bg-zinc-950/5 ${pathname === menuItem.route ? 'text-primary bg-zinc-950/5' : 'text-zinc-950 bg-transparent'}`}
                  aria-label={menuItem.name}
                >
                  <menuItem.icon className="size-5" /> {menuItem.name}
                </a>
              </Link>
            )}
          </Button>
        </TooltipTrigger>
        {!sidebarIsExpanded && (
          <TooltipContent side="right" sideOffset={5}>
            {menuItem.name}
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};

// TODO: Implement the support button, how can we handle the report of issues?
const Sidebar = () => {
  const [expanded, setExpanded] = React.useState(true);

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-20 col-start-1 flex h-full flex-col p-4 transition-all duration-300 ${expanded ? 'w-[240px]' : 'w-[56px]'}`}
    >
      <div className="flex items-center justify-between border-b pb-6">
        <Image
          className="w-auto max-w-[200px]"
          src="/logo_h.png"
          alt="Logo republicanas populares"
          width={200}
          height={50}
        />
      </div>
      <nav className="mt-6 grid gap-4">
        {menuItems.map((menuItem) => (
          <SidebarItem
            key={menuItem.name}
            menuItem={menuItem}
            sidebarIsExpanded={expanded}
          />
        ))}
      </nav>
      <nav className="mt-auto grid gap-1">
        {/* <div className="flex items-center justify-between border-b pb-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`mt-auto rounded-lg ${expanded ? 'justify-start px-2' : ''}`}
                  aria-label="Account"
                >
                  <ChevronLeftIcon className="size-5" />
                  {expanded && <span>Account</span>}
                </Button>
              </TooltipTrigger>
              {!expanded && (
                <TooltipContent side="right" sideOffset={5}>
                  Account
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </div> */}
        <div className="mt-4">
          <LogoutButton />
        </div>
        {/* <Button
          variant="ghost"
          size="icon"
          onClick={() => setExpanded(!expanded)}
          aria-label={expanded ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {expanded ? (
            <ChevronLeftIcon className="size-5" />
          ) : (
            <ChevronRightIcon className="size-5" />
          )}
        </Button> */}
      </nav>
    </aside>
  );
};

export default Sidebar;
