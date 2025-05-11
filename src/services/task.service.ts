import { api } from '@/lib/axios';
import { Task, TaskBody } from '@/types/task.types';

class TaskService {
  async getTasks(): Promise<Task[]> {
    const { data } = await api.get<Task[]>('/api/tasks');
    return data;
  }

  async getTask(id: number): Promise<Task> {
    const { data } = await api.get<Task>(`/api/tasks/${id}`);
    return data;
  }

  async filterTasksByStatus(status: number): Promise<Task[]> {
    const { data } = await api.get<Task[]>(`/api/tasks/filter/${status}`);
    return data;
  }

  async createTask(task: TaskBody): Promise<Task> {
    const { data } = await api.post<Task>('/api/tasks', task);
    return data;
  }

  async editTask(id: number, task: TaskBody): Promise<Task> {
    const { data } = await api.put<Task>(`/api/tasks/${id}`, task);
    return data;
  }

  async deleteTask(id: number): Promise<void> {
    await api.delete(`/api/tasks/${id}`);
  }
}

export const taskService = new TaskService();
