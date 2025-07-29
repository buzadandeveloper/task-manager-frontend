'use client';
import { useState } from 'react';
import { taskSchema, TaskFormData } from '@/features/tasks/schemas/task.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu';
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { DatePicker } from '@/components/date-picker';
import { Pencil, Trash2, Check, X } from 'lucide-react';
import { useDeleteTask, useEditTask, useUpdateTaskStatus } from '@/features/tasks/hooks/use-task';
import { Task } from '@/features/tasks/types/task.types';
import { STATUSES, TaskStatus } from '@/features/tasks/constants/statuses';

type ViewTaskInformationProps = {
  task: Task;
  index: number;
  statusFilter?: string;
  disabled?: boolean;
};

export const ViewTaskInformation = ({
  task,
  index,
  statusFilter,
  disabled,
}: ViewTaskInformationProps) => {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { id, status, title, description, date } = task;

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
      title: title || '',
      date: new Date(date),
      description: description || '',
    },
  });

  const { mutate: deleteTask, isPending: deleteTaskIsPending } = useDeleteTask(
    Number(statusFilter) as TaskStatus,
  );
  const { mutate: editTask, isPending: editTaskIsPending } = useEditTask(
    Number(statusFilter) as TaskStatus,
  );
  const { mutate: updateTaskStatus, isPending: updateTaskStatusIsPending } = useUpdateTaskStatus(
    Number(statusFilter) as TaskStatus,
  );

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const setDate = (date: Date) => {
    setValue('date', date, { shouldValidate: true });
  };

  const handleSave = (data: TaskFormData) => {
    const payload = {
      id: id!,
      task: {
        ...data,
        date: data.date.toISOString(),
      },
    };

    editTask(payload, {
      onSuccess: () => {
        setOpen(false);
        setIsEditing(false);
        reset({ ...data });
      },
    });
  };

  const updateStatus = (status: string) => {
    const payload = { id: id!, status: Number(status) as TaskStatus };

    updateTaskStatus(payload);
  };

  const handleCancel = () => {
    reset({
      title: title || '',
      date: new Date(date),
      description: description || '',
    });
    setIsEditing(false);
  };

  const handleDelete = (id: number) => {
    deleteTask(id, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size='sm' variant='secondary' className='text-xs h-[25px] p-[0.6em] font-medium'>
          Open Task
        </Button>
      </DialogTrigger>
      <DialogContent
        className='sm:max-w-[425px] bg-card'
        onCloseAutoFocus={handleCancel}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <div className='grid gap-4'>
          <DialogHeader>
            <DialogTitle>Task Information</DialogTitle>
          </DialogHeader>
        </div>
        <div>
          <div className='flex justify-between'>
            <DialogTitle className='text-md'>#{index + 1}</DialogTitle>
            <DropdownMenu>
              <DropdownMenuTrigger
                asChild
                disabled={editTaskIsPending || updateTaskStatusIsPending}
              >
                <Badge className='cursor-pointer'>{STATUSES[status!]}</Badge>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={status?.toString()}
                  onValueChange={(newStatus) => updateStatus(newStatus)}
                >
                  <DropdownMenuRadioItem value='0' disabled={disabled}>
                    To do
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value='1' disabled={disabled}>
                    In Progress
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value='2' disabled={disabled}>
                    Completed
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className='flex flex-col gap-2'>
            <div className='grid gap-1'>
              <div className='grid gap-3'>
                <DialogTitle className='text-md font-normal'>Task name:</DialogTitle>
                <Input
                  disabled={!isEditing || editTaskIsPending}
                  defaultValue={title}
                  {...register('title')}
                />
              </div>
              {errors.title && <p className='text-red-500 text-sm'>{errors.title.message}</p>}
            </div>
            <div className='grid gap-1'>
              <div className='grid gap-3'>
                <DialogTitle className='text-md font-normal'>Task details:</DialogTitle>
                <Textarea
                  className='custom-scrollbar resize-none h-[150px]'
                  disabled={!isEditing || editTaskIsPending}
                  defaultValue={description}
                  {...register('description')}
                />
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <div className='flex justify-between w-full'>
            <div className='flex gap-2'>
              <TooltipProvider>
                {isEditing ? (
                  <>
                    <Tooltip>
                      <TooltipTrigger>
                        <Button
                          variant='secondary'
                          disabled={editTaskIsPending}
                          onClick={handleSubmit(handleSave)}
                        >
                          <Check />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Save</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger>
                        <Button
                          variant='secondary'
                          disabled={editTaskIsPending}
                          onClick={handleCancel}
                        >
                          <X />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Cancel</TooltipContent>
                    </Tooltip>
                  </>
                ) : (
                  <>
                    <Tooltip>
                      <TooltipTrigger>
                        <Button
                          variant='secondary'
                          onClick={handleEdit}
                          disabled={disabled || deleteTaskIsPending}
                        >
                          <Pencil />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Edit</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger>
                        <Button
                          variant='secondary'
                          onClick={() => handleDelete(id!)}
                          disabled={disabled || deleteTaskIsPending}
                        >
                          <Trash2 />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Delete</TooltipContent>
                    </Tooltip>
                  </>
                )}
              </TooltipProvider>
            </div>
            {isEditing ? (
              <div className='w-[160px]'>
                <DatePicker
                  selected={watch('date')}
                  onSelect={(date) => setDate(date as Date)}
                  disabled={editTaskIsPending}
                />
                {errors.date && <p className='text-red-500 text-sm'>{errors.date.message}</p>}
              </div>
            ) : (
              <div className='flex items-center'>{format(date, 'yyyy/MM/dd')}</div>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
