import LiquidChrome from '@/components/liquid-chrome';

export default function Home() {
  return (
    <div className='flex items-center justify-center h-screen w-full'>
      <LiquidChrome className='absolute inset-0 z-0' />
      <div className='relative flex flex-col gap-2 ml-12 mr-12'>
        <h1 className='text-4xl text-center font-bold'>Welcome to Task Manager</h1>
        <p className='text-xl'>
          Manage your tasks with a clean interface and a dynamic visual experience.
        </p>
      </div>
    </div>
  );
}
