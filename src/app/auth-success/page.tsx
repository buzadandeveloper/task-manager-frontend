'use client';

import { Suspense } from 'react';
import { AuthSuccessClient } from '@/app/auth-success/auth-success-client';

export default function AuthSuccess() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthSuccessClient />
    </Suspense>
  );
}
