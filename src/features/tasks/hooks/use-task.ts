import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { taskService } from '@/features/tasks/services/task.service';
import { Task, TaskBody } from '@/features/tasks/types/task.types';
import { TaskStatus } from '@/features/tasks/constants/statuses';
import { showToast } from '@/lib/show-toast';

export const useGetTasks = (status: TaskStatus) => {
  return useQuery({
    queryKey: ['tasks', status],
    queryFn: () => taskService.getTasks(status),
  });
};

export const useCreateTask = (status: TaskStatus) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (task: Task) => taskService.createTask(task),
    onSuccess: (data) => {
      queryClient.setQueryData<Task[]>(['tasks', status], (oldTasks) =>
        oldTasks ? [...oldTasks, data] : [data],
      );
    },
  });
};

export const useEditTask = (status: TaskStatus) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, task }: { id: number; task: TaskBody }) => taskService.editTask(id, task),
    onSuccess: (data) => {
      const { id, ...task } = data;

      queryClient.setQueryData<Task[]>(
        ['tasks', status],
        (oldTasks) =>
          oldTasks?.map((oldTask) => (oldTask.id === id ? { ...oldTask, ...task } : oldTask)) ?? [],
      );
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['tasks', status] });
    },
  });
};

export const useUpdateTaskStatus = (status: TaskStatus) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: TaskStatus }) =>
      taskService.updateTaskStatus(id, status),
    onSuccess: (status, variables) => {
      const { id } = variables;

      queryClient.setQueryData<Task[]>(['tasks', status], (oldTasks) =>
        oldTasks?.map((task) => (task.id === id ? { ...task, status } : task)),
      );
    },
    onSettled: async (_data, _error, variables) => {
      await queryClient.invalidateQueries({ queryKey: ['tasks', status] });
      if (variables?.status !== status) {
        await queryClient.invalidateQueries({ queryKey: ['tasks', variables.status] });
      }
    },
  });
};

export const useDeleteTask = (status: TaskStatus) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => taskService.deleteTask(id),
    onSuccess: (_data, id) => {
      queryClient.setQueryData<Task[]>(['tasks', status], (oldTasks) =>
        oldTasks?.filter((task) => task.id !== id),
      );
      showToast({
        title: 'Task deleted',
        description: 'Your task was deleted successfully.',
        variant: 'default',
      });
    },
    onError: () => {
      showToast({ title: 'Error', description: 'Failed to delete task.', variant: 'destructive' });
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['tasks', status] });
    },
  });
};
