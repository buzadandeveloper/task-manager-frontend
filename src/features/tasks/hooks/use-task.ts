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

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (task: Task) => taskService.createTask(task),
    onSuccess: (data) => {
      [0, 4].forEach((status) => {
        queryClient.setQueryData<Task[]>(['tasks', status], (oldTasks) =>
          oldTasks ? [...oldTasks, data] : [data],
        );
      });

      showToast({
        title: 'Task created',
        description: 'Your task was added successfully.',
        variant: 'default',
      });
    },
    onError: () => {
      showToast({
        title: 'Error',
        description: 'Failed to create task.',
        variant: 'destructive',
      });
    },
  });
};

export const useEditTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, task }: { id: number; task: TaskBody }) => taskService.editTask(id, task),
    onSuccess: (data) => {
      const { id, status, ...task } = data;

      [4, status].forEach((status) => {
        queryClient.setQueryData<Task[]>(['tasks', status], (oldTasks) =>
          oldTasks?.map((oldTask) => (oldTask.id === id ? { ...oldTask, ...task } : oldTask)),
        );
      });

      showToast({
        title: 'Task updated',
        description: 'Your task was updated successfully.',
        variant: 'default',
      });
    },
    onError: () => {
      showToast({
        title: 'Error',
        description: 'Failed to update task.',
        variant: 'destructive',
      });
    },
  });
};

export const useUpdateTaskStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: TaskStatus }) =>
      taskService.updateTaskStatus(id, status),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['tasks'] });

      showToast({
        title: 'Status updated',
        description: `Task status updated.`,
        variant: 'default',
      });
    },
    onError: () => {
      showToast({
        title: 'Error',
        description: 'Failed to update task status.',
        variant: 'destructive',
      });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { id: number; status: number }) => {
      const { id } = payload;

      return taskService.deleteTask(id);
    },
    onSuccess: (_data, variables) => {
      const { id, status } = variables;

      [4, status].forEach((status) => {
        queryClient.setQueryData<Task[]>(['tasks', status], (oldTasks) =>
          oldTasks?.filter((task) => task.id !== id),
        );
      });
      showToast({
        title: 'Task deleted',
        description: 'Your task was deleted successfully.',
        variant: 'default',
      });
    },
    onError: () => {
      showToast({ title: 'Error', description: 'Failed to delete task.', variant: 'destructive' });
    },
  });
};
