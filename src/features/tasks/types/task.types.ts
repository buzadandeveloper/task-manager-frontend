export type Task = {
  id?: number;
  title: string;
  description?: string;
  status?: number;
  date: string;
};

export type TaskBody = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>;
