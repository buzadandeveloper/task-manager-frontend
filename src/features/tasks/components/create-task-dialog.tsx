'use client';

import { useForm } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { DatePicker } from '@/components/date-picker';
import { zodResolver } from '@hookform/resolvers/zod';
import { taskSchema, TaskFormData } from '@/features/tasks/schemas/task.schema';

export const CreateTaskDialog = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      name: '',
      date: new Date(),
      details: '',
    },
  });

  const setDate = (date: Date) => {
    setValue('date', date, { shouldValidate: true });
  };

  const onSubmit = (data: TaskFormData) => {
    console.log('Task Created:', data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>Create Task</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='grid gap-4'>
            <DialogHeader>
              <DialogTitle>Create Task</DialogTitle>
            </DialogHeader>
            <div className='grid gap-3'>
              <Label htmlFor='task-name'>Task Name</Label>
              <Input id='task-name' {...register('name')} />
              {errors.name && <p className='text-red-500 text-sm'>{errors.name.message}</p>}
            </div>
            <div className='grid gap-3'>
              <Label htmlFor='task-date'>Task Date</Label>
              <DatePicker selected={watch('date')} onSelect={(date) => setDate(date as Date)} />
              {errors.date && <p className='text-red-500 text-sm'>{errors.date.message}</p>}
            </div>
            <div className='grid gap-3'>
              <Label htmlFor='task-details'>Task Details</Label>
              <Textarea
                className='custom-scrollbar resize-none h-[150px]'
                {...register('details')}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant='outline'>Cancel</Button>
              </DialogClose>
              <Button type='submit'>Create</Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
