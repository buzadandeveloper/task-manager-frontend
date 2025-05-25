'use client';
import { withAuth } from '@/lib/with-auth';

function Dashboard() {
  return <div className='flex items-center justify-center h-screen'>Welcome back!</div>;
}

export default withAuth(Dashboard);
