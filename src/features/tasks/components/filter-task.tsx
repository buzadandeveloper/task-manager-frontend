'use client';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const FilterTask = () => {
  return (
    <Tabs>
      <TabsList>
        <TabsTrigger value='0'>To do</TabsTrigger>
        <TabsTrigger value='1'>In progress</TabsTrigger>
        <TabsTrigger value='2'>Completed</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
