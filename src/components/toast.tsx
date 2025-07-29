'use client';

import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type ToastProps = {
  title: string;
  description: string;
  variant: 'default' | 'destructive';
};

export const Toast = ({ title, description, variant }: ToastProps) => {
  return (
    <Alert variant={variant} className='w-100'>
      <AlertCircle />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};
