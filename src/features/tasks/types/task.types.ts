export type Task = {
  id: number;
  title: string;
  description: string;
  status: number;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
};

export type TaskBody = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>;
