'use client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useOAuthLogin } from '@/features/login/hooks/use-auth';
import { ThemeButton } from '@/components/theme-button';
import { LayoutDashboard, LogOut } from 'lucide-react';
import { TaskManagerIcon } from '@/icons/task-manager-icon';
import { useQueryData } from '@/hooks/use-query-data';
import { useRouter, usePathname } from 'next/navigation';
import { User } from '@/features/profile/types/user.types';

export const AppNavbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useOAuthLogin();
  const user = useQueryData<User>('current-user');

  const hiddenRoutes = ['/login'];
  if (hiddenRoutes.includes(pathname)) {
    return null;
  }

  return (
    <Card className='w-full h-[50px] bg-white/10 backdrop-blur-none fixed rounded-none shadow-none dark:bg-zinc-800'>
      <CardContent className='flex justify-between items-center h-full ml-2 mr-2 gap-5 md:ml-[10em] md:mr-[10em]'>
        <div className='flex gap-1 text-l hover:bg-transparent'>
          <TaskManagerIcon />
          Task Manager
        </div>
        <div>
          {!user && (
            <Button size='sm' variant='nav' onClick={() => router.push('/login')}>
              <LayoutDashboard />
              Dashboard
            </Button>
          )}
          {user && (
            <Button size='sm' variant='nav' onClick={logout}>
              <LogOut />
              Log Out
            </Button>
          )}
          <ThemeButton />
        </div>
      </CardContent>
    </Card>
  );
};
