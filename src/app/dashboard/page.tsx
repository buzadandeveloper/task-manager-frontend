'use client';
import { withAuth } from '@/lib/with-auth';
import { CreateTaskDialog } from '@/features/tasks';

function Dashboard() {
  return (
    <div className='flex items-center justify-center h-screen w-full'>
      <CreateTaskDialog />
    </div>
  );
}

export default withAuth(Dashboard);
