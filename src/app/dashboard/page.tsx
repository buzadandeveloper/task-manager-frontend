'use client';
import { withAuth } from '@/lib/with-auth';
import { TaskCard, CreateTaskDialog } from '@/features/tasks';
import { useGetTasks } from '@/features/tasks/hooks/use-task';
import { TaskManagerIcon } from '@/icons/task-manager-icon';

function Dashboard() {
  const { data: tasks, isLoading, isFetching } = useGetTasks();

  console.log(tasks);

  return (
    <div className='flex flex-col gap-[2em] h-full w-full mt-[64px] ml-8 mr-8 md:ml-[12em] md:mr-[12em]'>
      <div className='w-full flex justify-end'>
        <CreateTaskDialog />
      </div>
      <div className='w-full h-[calc(100vh-252px)] rounded-xl p-6 overflow-auto custom-scrollbar bg-wrapper'>
        <div
          className={`${isLoading || isFetching ? 'flex justify-center items-center h-full' : 'grid gap-4 grid-cols-[repeat(auto-fit,minmax(230px,1fr))]'}`}
        >
          {isLoading || isFetching ? (
            <TaskManagerIcon className='animate-spin scale-[2]' />
          ) : (
            tasks?.map((task, index) => <TaskCard key={task.id} task={task} index={index} />)
          )}
        </div>
      </div>
    </div>
  );
}

export default withAuth(Dashboard);
