import { z } from 'zod';

export const taskSchema = z.object({
  name: z
    .string({ required_error: 'Task name is required' })
    .min(1, 'Task name is required')
    .max(40, 'Task name must be 40 characters or less'),
  date: z.date({ required_error: 'Task date is required' }),
  details: z.string().optional(),
});

export type TaskFormData = z.infer<typeof taskSchema>;
