'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useUpdateTaskStatus } from '@/features/tasks/hooks/use-task';
import { ViewTaskInformation } from '@/features/tasks';
import { STATUSES, TaskStatus } from '@/features/tasks/constants/statuses';
import { Task } from '@/features/tasks/types/task.types';
import { format } from 'date-fns';

type TaskCardProps = {
  task: Task;
  index: number;
  disabled?: boolean;
};

export const TaskCard = ({ task, index, disabled }: TaskCardProps) => {
  const { id, title, status, date } = task;

  const { mutate: updateTaskStatus, isPending: updateTaskStatusIsPending } = useUpdateTaskStatus();

  const updateStatus = (status: string) => {
    const payload = { id: id!, status: Number(status) as TaskStatus };

    updateTaskStatus(payload);
  };

  return (
    <Card className='w-full h-[180px] flex justify-between'>
      <CardHeader className='flex justify-between'>
        <CardTitle>{`#${index + 1}`}</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild disabled={updateTaskStatusIsPending}>
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
      </CardHeader>
      <CardContent>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className='w-full'>
              <CardDescription className='text-base font-medium leading-none truncate text-start h-[20px]'>
                {title}
              </CardDescription>
            </TooltipTrigger>
            <TooltipContent className='max-w-[190px]'>{title}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <ViewTaskInformation task={task} index={index} disabled={disabled} />
        <CardDescription>{format(date, 'yyyy/MM/dd')}</CardDescription>
      </CardFooter>
    </Card>
  );
};
