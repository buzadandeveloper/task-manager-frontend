'use client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useOAuthLogin } from '@/features/login/hooks/use-auth';

export const AppNavbar = () => {
  const { loginWithGoogle } = useOAuthLogin();

  return (
    <Card className='w-full h-[50px] bg-sidebar fixed top-0 left-0 z-50 rounded-none shadow-none'>
      <CardContent className='flex justify-end items-center h-full ml-[10em] mr-[10em]'>
        <Button
          size='sm'
          variant='secondary'
          className='text-xs h-[25px] p-[0.6em] font-medium'
          onClick={loginWithGoogle}
        >
          Google
        </Button>
      </CardContent>
    </Card>
  );
};
