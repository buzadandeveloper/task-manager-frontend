'use client';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Settings, SquareUserRound, LayoutDashboard } from 'lucide-react';
import { useQueryData } from '@/hooks/use-query-data';
import { useRouter } from 'next/navigation';
import { User } from '@/features/profile/types/user.types';

const items = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Profile',
    url: '/',
    icon: SquareUserRound,
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: Settings,
  },
];

export const AppSidebar = () => {
  const user = useQueryData<User>('current-user');
  const router = useRouter();

  if (!user) return null;

  return (
    <div className='fixed'>
      <Sidebar className='relative'>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton onClick={() => router.push(item.url)}>
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarTrigger className='absolute top-0 ml-[260px]' />
        </SidebarContent>
      </Sidebar>
    </div>
  );
};
