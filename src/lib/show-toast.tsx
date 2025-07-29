'use client';

import { toast } from 'sonner';
import { Toast } from '@/components/toast';

type showToastProps = {
  title: string;
  description: string;
  variant: 'default' | 'destructive';
};

export function showToast({ title, description, variant }: showToastProps) {
  toast.custom(() => <Toast title={title} description={description} variant={variant} />);
}
