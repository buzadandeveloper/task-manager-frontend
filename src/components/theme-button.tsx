'use client';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';

export const ThemeButton = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      size='sm'
      variant='nav'
      className='text-xs h-[25px] p-[0.6em] font-medium'
    >
      {theme === 'dark' ? <Sun /> : <Moon />}
    </Button>
  );
};
