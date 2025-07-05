import { api } from '@/lib/axios';
import { Task, TaskBody } from '@/features/tasks/types/task.types';
import { TaskStatus } from '@/features/tasks/constants/statuses';

class TaskService {
  async getTasks(): Promise<Task[]> {
    const { data } = await api.get<Task[]>('/api/tasks');
    return data;
  }

  async filterTasksByStatus(status: number): Promise<Task[]> {
    const { data } = await api.get<Task[]>(`/api/tasks/filter/${status}`);
    return data;
  }

  async createTask(task: TaskBody): Promise<TaskBody> {
    const { data } = await api.post<TaskBody>('/api/tasks/newTask', task);
    return data;
  }

  async editTask(id: number, task: TaskBody): Promise<Task> {
    const { data } = await api.put<Task>(`/api/tasks/updateTask/${id}`, task);
    return data;
  }

  async updateTaskStatus(id: number, status: TaskStatus): Promise<TaskStatus> {
    const { data } = await api.put<TaskStatus>(`/api/tasks/updateStatus/${id}`, { status });
    return data;
  }

  async deleteTask(id: number): Promise<void> {
    await api.delete(`/api/tasks/removeTask/${id}`);
  }
}

export const taskService = new TaskService();
