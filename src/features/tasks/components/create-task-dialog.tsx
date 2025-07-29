'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { taskSchema, TaskFormData } from '@/features/tasks/schemas/task.schema';
import { useCreateTask } from '@/features/tasks/hooks/use-task';
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
import { TaskStatus } from '@/features/tasks/constants/statuses';

type CreateTaskDialogProps = {
  status: string;
};

export const CreateTaskDialog = ({ status }: CreateTaskDialogProps) => {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '',
      date: new Date(),
      description: '',
    },
  });

  const { mutate: createTask, isPending } = useCreateTask(Number(status) as TaskStatus);

  const setDate = (date: Date) => {
    setValue('date', date, { shouldValidate: true });
  };

  const onHandleCancel = () => {
    reset({
      title: '',
      date: new Date(),
      description: '',
    });
  };

  const onSubmit = (data: TaskFormData) => {
    const payload = {
      ...data,
      date: data.date.toISOString(),
      status: 0 as const,
    };

    createTask(payload, {
      onSuccess: () => {
        setOpen(false);
        onHandleCancel();
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='secondary'>Create Task</Button>
      </DialogTrigger>
      <DialogContent
        className='sm:max-w-[425px] bg-card'
        onCloseAutoFocus={onHandleCancel}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='grid gap-4'>
            <DialogHeader>
              <DialogTitle>Create Task</DialogTitle>
            </DialogHeader>
            <div className='grid gap-1'>
              <div className='grid gap-3'>
                <Label htmlFor='task-name'>Task Name</Label>
                <Input id='task-name' {...register('title')} maxLength={100} />
              </div>
              {errors.title && <p className='text-red-500 text-sm'>{errors.title.message}</p>}
            </div>
            <div className='grid gap-1'>
              <div className='grid gap-3'>
                <Label htmlFor='task-date'>Task Date</Label>
                <DatePicker selected={watch('date')} onSelect={(date) => setDate(date as Date)} />
              </div>
              {errors.date && <p className='text-red-500 text-sm'>{errors.date.message}</p>}
            </div>
            <div className='grid gap-3'>
              <Label htmlFor='task-details'>Task Details</Label>
              <Textarea
                className='custom-scrollbar resize-none h-[150px]'
                {...register('description')}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant='secondary' disabled={isPending} onClick={() => onHandleCancel()}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type='submit' disabled={isPending}>
                Create
              </Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
