import React from 'react';
import { Bell, Search, User } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import ThemeToggle from '../ThemeToggle';

const Header: React.FC = () => {
  const { user, logout } = useAuthStore();

  return (
    <header className="sticky top-0 z-30 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search everything..."
              className="w-full pl-10 pr-4 py-2 rounded-full bg-muted/50 border border-border
                focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary" />
          </button>

          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <span className="font-medium">{user?.name}</span>
              </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className="min-w-[200px] rounded-lg p-2 bg-popover border border-border shadow-lg
                  animate-in fade-in-0 zoom-in-95 z-50"
                sideOffset={5}
                align="end"
              >
                <DropdownMenu.Item
                  className="px-3 py-2 text-sm rounded-md hover:bg-muted cursor-pointer"
                  onClick={() => {/* TODO: Navigate to profile */}}
                >
                  Profile Settings
                </DropdownMenu.Item>
                <DropdownMenu.Separator className="my-2 h-px bg-border" />
                <DropdownMenu.Item
                  className="px-3 py-2 text-sm rounded-md hover:bg-destructive/10 hover:text-destructive cursor-pointer"
                  onClick={logout}
                >
                  Logout
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </div>
    </header>
  );
};

export default Header;