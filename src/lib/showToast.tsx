'use client';

import { toast } from 'sonner';
import { Toast } from '@/components/Toast';

type showToastProps = {
  title: string;
  description: string;
};

export function showToast({ title, description }: showToastProps) {
  toast.custom(() => <Toast title={title} description={description} />);
}
