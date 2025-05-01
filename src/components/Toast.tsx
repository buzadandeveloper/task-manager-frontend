'use client';

import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/src/components/ui/alert';

type ToastProps = {
  title: string;
  description: string;
};

export const Toast = ({ title, description }: ToastProps) => {
  return (
    <Alert variant='destructive' className='w-100  border-red-500'>
      <AlertCircle />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};
