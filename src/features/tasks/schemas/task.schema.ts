import { z } from 'zod';

export const taskSchema = z.object({
  title: z
    .string({ required_error: 'Task name is required' })
    .min(1, 'Task name is required')
    .max(100, 'Task name must be 100 characters or less'),
  date: z.date({ required_error: 'Task date is required' }),
  description: z.string().optional(),
});

export type TaskFormData = z.infer<typeof taskSchema>;
