import { User } from '@/features/profile/types/user.types';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { GoogleIcon } from '@/icons/google-icon';
import { Github, LayoutDashboard, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useOAuthLogin } from '@/features/login/hooks/use-auth';
import { useRouter } from 'next/navigation';

type ProfileCardProps = {
  user: User;
};

export const MenuProfileCard = ({ user }: ProfileCardProps) => {
  const { logout } = useOAuthLogin();
  const router = useRouter();

  return (
    <DropdownMenu>
      <Button size='sm' variant='nav'>
        <DropdownMenuTrigger className='flex items-center cursor-pointer'>
          <Avatar className='w-6 h-6'>
            <AvatarImage src={user.avatar} />
          </Avatar>
          <DropdownMenuLabel>
            <p className='text-start'>{user.name}</p>
          </DropdownMenuLabel>
        </DropdownMenuTrigger>
      </Button>
      <DropdownMenuContent>
        <div>
          <div className='flex flex-col items-center'>
            <div className='flex flex-col gap-2'>
              <h2 className='text-xs font-bold'>{user.name}</h2>
              <p className='text-xs mb-1'>{user.email}</p>
              <Badge variant='secondary' className='bg-wrapper'>
                {user.provider === 'google' ? <GoogleIcon /> : <Github className='w-4 h-[14px]' />}
                Logged in via {user.provider === 'google' ? 'Google' : 'GitHub'}
              </Badge>
            </div>
          </div>
        </div>
        <DropdownMenuGroup>
          <DropdownMenuSeparator />
          {user && (
            <DropdownMenuItem onClick={() => router.push('/dashboard')}>
              <LayoutDashboard />
              Dashboard
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={logout}>
            <LogOut /> Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
