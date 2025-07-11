import { TaskCard } from '@/features/tasks';

export default function Home() {
  return (
    <main className='flex flex-col items-center justify-center min-h-screen w-full gap-20 max-lg:mt-[80px]'>
      <section className='text-center max-w-2xl ml-12 mr-12'>
        <h1 className='text-5xl font-extrabold tracking-tight leading-tight'>
          Organize. Prioritize. <span className=''>Achieve.</span>
        </h1>
        <p className='mt-4 text-lg'>
          Welcome to <strong>Task Manager</strong> — a smart way to stay focused, monitor progress,
          and complete tasks effortlessly.
        </p>
      </section>
      <div className='flex justify-center items-center w-full gap-20 max-lg:flex-col'>
        <div className='w-[250px] rotate-[-15deg] transform transition-transform hover:scale-105'>
          <TaskCard
            task={{
              title: 'First Task',
              status: 0,
              date: new Date().toISOString(),
            }}
            index={0}
            statusFilter={'1'}
            disabled={true}
          />
        </div>
        <div className='w-[250px] transform transition-transform hover:scale-105'>
          <TaskCard
            task={{
              title: 'Second Task',
              status: 1,
              date: new Date().toISOString(),
            }}
            index={1}
            statusFilter={'1'}
            disabled={true}
          />
        </div>
        <div className='w-[250px] rotate-[15deg] transform transition-transform hover:scale-105 max-lg:rotate-[-15deg]'>
          <TaskCard
            task={{
              title: 'Third Task',
              status: 2,
              date: new Date().toISOString(),
            }}
            index={2}
            statusFilter={'1'}
            disabled={true}
          />
        </div>
      </div>
      <footer className='mt-12 text-sm text-center max-lg:mb-10 max-lg:mt-0'>
        © {new Date().getFullYear()} Task Manager · Built with ❤️ for productivity
      </footer>
    </main>
  );
}
