'use client';
import { useOAuthLogin } from '@/features/login/hooks/use-auth';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';
import { GoogleIcon } from '@/icons/google-icon';
import { TaskManagerIcon } from '@/icons/task-manager-icon';
import { useRouter } from 'next/navigation';

export const LoginCard = () => {
  const { loginWithGoogle, loginWithGitHub } = useOAuthLogin();
  const router = useRouter();

  return (
    <main className='w-[65%] h-screen max-md:w-full'>
      <Card className='flex justify-center align-center w-full h-screen rounded-none  backdrop-blur-none bg-card'>
        <CardTitle
          className='flex items-center gap-1 text-l hover:bg-transparent top-5 left-5 absolute p-5 cursor-pointer'
          onClick={() => router.push('/')}
        >
          <TaskManagerIcon />
          Task Manager
        </CardTitle>
        <CardHeader className='text-center'>
          <CardTitle className='text-4xl'>Welcome</CardTitle>
          <CardDescription className='text-xl'>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col items-center justify-center gap-2'>
          <Button variant='secondary' className='w-xs' onClick={loginWithGoogle}>
            <GoogleIcon /> Continue with Google
          </Button>
          <span>or</span>
          <Button variant='secondary' className='w-xs' onClick={loginWithGitHub}>
            <Github /> Continue with GitHub
          </Button>
        </CardContent>
      </Card>
    </main>
  );
};
