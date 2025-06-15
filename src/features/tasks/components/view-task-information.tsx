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

export const ViewTaskInformation = () => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size='sm' variant='secondary' className='text-xs h-[25px] p-[0.6em] font-medium'>
          Open Task
        </Button>
      </DialogTrigger>
      <DialogContent
        className='sm:max-w-[425px] dark:bg-zinc-800'
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
            <DialogTitle className='text-md'>T-1</DialogTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Badge className='cursor-pointer'>To do</Badge>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='dark:bg-zinc-800'>
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
              <Input disabled={!isEditing} />
            </div>
            <div>
              <DialogTitle className='text-md font-normal'>Task details:</DialogTitle>
              <Textarea className='custom-scrollbar resize-none h-[150px]' disabled={!isEditing} />
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
                        <Button variant='secondary'>
                          <Trash2 />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Delete</TooltipContent>
                    </Tooltip>
                  </>
                )}
              </TooltipProvider>
            </div>
            <div className='flex items-center'>12/12/2023</div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
