import { TaskStatus } from '@/features/tasks/constants/statuses';
export type Task = {
  id?: number;
  title: string;
  description?: string;
  status?: TaskStatus;
  date: string;
};

export type TaskBody = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>;
