import { TaskManagerIcon } from '@/icons/task-manager-icon';

export const LoadingSpinner = () => (
  <div className='flex justify-center items-center fixed z-100  h-screen w-full bg-background'>
    <TaskManagerIcon className='animate-spin scale-[2]' />
  </div>
);
