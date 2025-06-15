'use client';
import { withAuth } from '@/lib/with-auth';
import { TaskCard } from '@/features/tasks';

function Dashboard() {
  return (
    <div className='flex items-center justify-center h-screen w-full'>
      <TaskCard id={1} status={'To do'} description={'To do something'} date={'14-06-25'} />
    </div>
  );
}

export default withAuth(Dashboard);
