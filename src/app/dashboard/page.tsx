'use client';
import { withAuth } from '@/lib/with-auth';
import { TaskCard, CreateTaskDialog } from '@/features/tasks';

function Dashboard() {
  return (
    <div className='flex flex-col gap-5 h-[calc(100vh-50px)] w-full mt-[64px] ml-8 mr-8 md:ml-[12em] md:mr-[12em]'>
      <div className='w-full flex justify-end'>
        <CreateTaskDialog />
      </div>
      <div className='w-full h-[calc(100vh-190px)] rounded-xl p-6 overflow-auto custom-scrollbar bg-wrapper'>
        <div className='grid gap-4 grid-cols-[repeat(auto-fit,minmax(230px,1fr))]'>
          <TaskCard id={1} status={'To do'} description={'To do something'} date={'14-06-25'} />
          <TaskCard
            id={1}
            status={'To do'}
            description={'To do something f saf as f asf as f asf as'}
            date={'14-06-25'}
          />
          <TaskCard id={1} status={'To do'} description={'To do something'} date={'14-06-25'} />
          <TaskCard id={1} status={'To do'} description={'To do something'} date={'14-06-25'} />
          <TaskCard id={1} status={'To do'} description={'To do something'} date={'14-06-25'} />
        </div>
      </div>
    </div>
  );
}

export default withAuth(Dashboard);
