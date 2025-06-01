import { LoginCard, Quote } from '@/features/login';

export default function Login() {
  return (
    <div className='flex h-screen w-full'>
      <div className='flex w-full'>
        <LoginCard />
        <Quote />
      </div>
    </div>
  );
}
