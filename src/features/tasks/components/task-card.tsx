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

type TaskCardProps = {
  id: number;
  status: string;
  description: string;
  date: string;
};

export const TaskCard = ({ id, status, description, date }: TaskCardProps) => {
  return (
    <Card className='w-full h-[180px] flex justify-between'>
      <CardHeader className='flex justify-between'>
        <CardTitle>{`T-${id}`}</CardTitle>
        <Badge>{status}</Badge>
      </CardHeader>
      <CardContent>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className='w-full'>
              <CardDescription className='text-base font-medium leading-none truncate text-start h-[20px]'>
                {description}
              </CardDescription>
            </TooltipTrigger>
            <TooltipContent className='max-w-[190px]'>{description}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <ViewTaskInformation />
        <CardDescription>{date}</CardDescription>
      </CardFooter>
    </Card>
  );
};
