import React from 'react';
import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import { QueryProvider } from '@/providers/query-provider';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from 'next-themes';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppNavbar } from '@/components/app-navbar';
import './globals.css';

const openSans = Open_Sans({
  variable: '--font-open-sans',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Task Manager App',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning className={`${openSans.variable} antialiased`}>
      <body className='overflow-none'>
        <ThemeProvider attribute='class' defaultTheme='light' storageKey='theme'>
          <QueryProvider>
            <AppNavbar />
            <SidebarProvider>
              {children}
              <Toaster position={'top-right'} expand visibleToasts={1} />
            </SidebarProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
