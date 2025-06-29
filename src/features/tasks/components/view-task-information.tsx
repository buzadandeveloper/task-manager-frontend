'use client';
import { useState } from 'react';
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
import { Pencil, Trash2, Check, X } from 'lucide-react';
import { useDeleteTask } from '@/features/tasks/hooks/use-task';
import { Task } from '@/features/tasks/types/task.types';
import { STATUSES } from '@/features/tasks/constants/statuses';
import { format } from 'date-fns';

type ViewTaskInformationProps = {
  task: Task;
};

export const ViewTaskInformation = ({ task }: ViewTaskInformationProps) => {
  const { id, status, title, description, date } = task;
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { mutate: deleteTask } = useDeleteTask();

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleDelete = (id: number) => {
    deleteTask(id);
    setOpen(false);
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
            <DialogTitle className='text-md'>T-{id}</DialogTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Badge className='cursor-pointer'>{STATUSES[status!]}</Badge>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='bg-card'>
                <DropdownMenuLabel>Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value='todo'>
                  <DropdownMenuRadioItem value='todo'>To do</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value='in-progress'>In Progress</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value='completed'>Completed</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className='flex flex-col gap-2'>
            <div>
              <DialogTitle className='text-md font-normal'>Task name:</DialogTitle>
              <Input disabled={!isEditing} defaultValue={title} />
            </div>
            <div>
              <DialogTitle className='text-md font-normal'>Task details:</DialogTitle>
              <Textarea
                className='custom-scrollbar resize-none h-[150px]'
                disabled={!isEditing}
                defaultValue={description}
              />
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
                        <Button variant='secondary' onClick={handleSave}>
                          <Check />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Save</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger>
                        <Button variant='secondary' onClick={handleCancel}>
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
                        <Button variant='secondary' onClick={handleEdit}>
                          <Pencil />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Edit</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger>
                        <Button variant='secondary' onClick={() => handleDelete(id!)}>
                          <Trash2 />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Delete</TooltipContent>
                    </Tooltip>
                  </>
                )}
              </TooltipProvider>
            </div>
            <div className='flex items-center'>{format(date, 'yyyy/MM/dd')}</div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
