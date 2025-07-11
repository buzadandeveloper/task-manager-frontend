import { TaskManagerIcon } from '@/icons/task-manager-icon';

export default function NotFound() {
  return (
    <main className='flex items-center justify-center fixed bg-background h-screen w-full z-60'>
      <div className='flex items-center gap-1 text-l font-semibold hover:bg-transparent top-5 left-5 absolute p-5'>
        <TaskManagerIcon />
        Task Manager
      </div>
      <div className='relative flex flex-col gap-2 ml-12 mr-12'>
        <h1 className='text-4xl text-center font-bold'>404 - Not Found</h1>
        <p className='text-xl'>The page you are looking for does not exist.</p>
      </div>
    </main>
  );
}
