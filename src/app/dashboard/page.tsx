'use client';
import { withAuth } from '@/lib/with-auth';
import { TaskCard, CreateTaskDialog, FilterTask } from '@/features/tasks';
import { useGetTasks } from '@/features/tasks/hooks/use-task';
import { TaskManagerIcon } from '@/icons/task-manager-icon';
import { TaskStatus } from '@/features/tasks/constants/statuses';
import { useState } from 'react';

function Dashboard() {
  const [status, setStatus] = useState('4');
  const { data: tasks, isLoading } = useGetTasks(Number(status) as TaskStatus);

  const onStatusChangeAction = (value: string) => {
    setStatus(value);
  };

  const noTasks = tasks?.length === 0 && !isLoading;

  return (
    <div className='flex flex-col gap-[1em] h-full w-full mt-[64px] ml-8 mr-8 md:ml-[12em] md:mr-[12em]'>
      <div className='w-full flex justify-end'>
        <CreateTaskDialog />
      </div>
      <div className='w-full rounded-xl '>
        <FilterTask status={status} onStatusChangeAction={onStatusChangeAction} />
      </div>
      <div className='w-full h-[calc(100vh-252px)] rounded-xl p-6 overflow-auto custom-scrollbar bg-wrapper'>
        <div
          className={`${isLoading || noTasks ? 'flex justify-center items-center h-full' : 'grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(230px,1fr))]'}`}
        >
          {isLoading ? (
            <TaskManagerIcon className='animate-spin scale-[2]' />
          ) : (
            tasks?.map((task, index) => <TaskCard key={task.id} task={task} index={index} />)
          )}
          {noTasks && (
            <div className='flex justify-center items-center gap-2'>
              <TaskManagerIcon />
              {noTasksText(status)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withAuth(Dashboard);

const noTasksText = (status: string) => {
  if (status === '0') {
    return 'No tasks in to do';
  } else if (status === '1') {
    return 'No tasks in progress';
  } else if (status === '2') {
    return 'No tasks completed';
  } else if (status === '4') {
    return 'No tasks available';
  }
};
