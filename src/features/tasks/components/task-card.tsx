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
import { Button } from '@/components/ui/button';

type TaskCardProps = {
  id: number;
  status: string;
  description: string;
  date: string;
  action: () => void;
};

export const TaskCard = ({ id, status, description, date, action }: TaskCardProps) => {
  return (
    <Card className='w-[250px] h-[180px] flex justify-between dark:bg-zinc-800'>
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
        <Button
          size='sm'
          variant='secondary'
          className='text-xs h-[25px] p-[0.6em] font-medium'
          onClick={action}
        >
          Open Task
        </Button>
        <CardDescription>{date}</CardDescription>
      </CardFooter>
    </Card>
  );
};
