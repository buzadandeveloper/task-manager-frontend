import { Suspense } from 'react';
import { AuthSuccessClient } from '@/app/auth-success/auth-success-client';

export default function AuthSuccessPage() {
  return (
    <Suspense>
      <AuthSuccessClient />
    </Suspense>
  );
}
