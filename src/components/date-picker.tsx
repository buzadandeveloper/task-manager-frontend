'use client';

import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type DatePickerProps = {
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
};

export function DatePicker({ selected, onSelect }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal',
            !selected && 'text-muted-foreground',
          )}
        >
          <CalendarIcon className='mr-2 h-4 w-4' />
          {selected ? format(selected, 'PPP') : <span>Select a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0 bg-card'>
        <Calendar
          className='pointer-events-auto'
          mode='single'
          selected={selected}
          onSelect={(date) => onSelect?.(date)}
        />
      </PopoverContent>
    </Popover>
  );
}
