import React from 'react';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { QueryProvider } from '@/src/providers/QueryProvider';
import { Toaster } from '@/src/components/ui/sonner';
import { ThemeProvider } from 'next-themes';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
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
    <html
      lang='en'
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body>
        <ThemeProvider attribute='class' defaultTheme='light' enableSystem>
          <QueryProvider>
            {children}
            <Toaster position={'top-right'} expand visibleToasts={1} />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
