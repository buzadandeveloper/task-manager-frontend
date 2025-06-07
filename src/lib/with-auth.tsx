'use client';

import { JSX } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/features/profile/hooks/use-user';
import { LoadingSpinner } from '@/components/loading-spinner';

export function withAuth<P extends JSX.IntrinsicAttributes>(
  WrappedComponent: React.ComponentType<P>,
) {
  return function ProtectedComponent(props: P) {
    const { isLoading, isError } = useUser();
    const router = useRouter();

    if (isLoading) return <LoadingSpinner />;

    if (isError) {
      router.replace('/login');
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}
