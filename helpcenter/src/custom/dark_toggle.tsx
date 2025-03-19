'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/components/ui/dropdown-menu';

export function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme(); // Use `resolvedTheme` for accurate detection
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Prevents hydration mismatch
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon'>
          {resolvedTheme === 'dark' ? (
            <Moon className='h-[1.2rem] w-[1.2rem] text-white' />
          ) : (
            <Sun className='h-[1.2rem] w-[1.2rem] text-black' />
          )}
          <span className='sr-only'>Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={() => setTheme('light')}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
