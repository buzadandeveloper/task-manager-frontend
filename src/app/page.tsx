import { TaskCard } from '@/features/tasks';
import { TaskStatus } from '@/features/tasks/constants/statuses';

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
        {exampleTasks.map((task, index) => (
          <div
            key={task.status}
            className={`w-[250px] rotate-[${task.rotate}] transform transition-transform hover:scale-105`}
          >
            <TaskCard
              task={{
                title: task.title,
                description: task.description,
                status: task.status as TaskStatus,
                date: new Date().toISOString(),
              }}
              index={index}
              disabled={true}
            />
          </div>
        ))}
      </div>
      <footer className='mt-12 text-sm text-center max-lg:mb-10 max-lg:mt-0'>
        © {new Date().getFullYear()} Task Manager · Built with ❤️ for productivity
      </footer>
    </main>
  );
}

const exampleTasks = [
  {
    title: '🌅 Morning Routine',
    description:
      'Design a morning ritual that energizes you — from meditation to a focused to-do list.',
    status: 0,
    rotate: '-15deg',
  },
  {
    title: '🧠 Sprint Planning',
    description: 'Define priorities, assign owners, and get everyone aligned for the week ahead.',
    status: 1,
    rotate: '0deg',
  },
  {
    title: '✍️ Write a Blog Post',
    description: 'Share what you’ve learned — teach, inspire, and grow your personal brand.',
    status: 2,
    rotate: '15deg',
  },
];
