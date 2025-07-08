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
import { ViewTaskInformation } from '@/features/tasks';
import { STATUSES } from '@/features/tasks/constants/statuses';
import { Task } from '@/features/tasks/types/task.types';
import { format } from 'date-fns';

type TaskCardProps = {
  task: Task;
  index: number;
  statusFilter: string;
};

export const TaskCard = ({ task, index, statusFilter }: TaskCardProps) => {
  const { title, status, date } = task;

  return (
    <Card className='w-full h-[180px] flex justify-between'>
      <CardHeader className='flex justify-between'>
        <CardTitle>{`#${index + 1}`}</CardTitle>
        <Badge>{STATUSES[status!]}</Badge>
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
        <ViewTaskInformation task={task} index={index} statusFilter={statusFilter} />
        <CardDescription>{format(date, 'yyyy/MM/dd')}</CardDescription>
      </CardFooter>
    </Card>
  );
};
