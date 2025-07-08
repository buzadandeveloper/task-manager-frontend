'use client';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

type FilterTaskProps = {
  status: string;
  onStatusChangeAction: (value: string) => void;
};

export const FilterTask = ({ status, onStatusChangeAction }: FilterTaskProps) => {
  return (
    <Tabs value={status} onValueChange={onStatusChangeAction}>
      <TabsList className='w-[50%]'>
        <TabsTrigger value='4'>All</TabsTrigger>
        <TabsTrigger value='0'>To do</TabsTrigger>
        <TabsTrigger value='1'>In progress</TabsTrigger>
        <TabsTrigger value='2'>Completed</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
