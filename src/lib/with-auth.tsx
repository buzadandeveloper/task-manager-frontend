'use client';
import { JSX, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function withAuth<P extends JSX.IntrinsicAttributes>(
  WrappedComponent: React.ComponentType<P>,
) {
  return function ProtectedComponent(props: P) {
    const router = useRouter();

    useEffect(() => {
      const token = document.cookie.split('; ').find((row) => row.startsWith('token='));
      if (!token) router.replace('/login');
    }, [router]);

    return <WrappedComponent {...props} />;
  };
}
