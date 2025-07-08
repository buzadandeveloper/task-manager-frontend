import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { taskService } from '@/features/tasks/services/task.service';
import { Task, TaskBody } from '@/features/tasks/types/task.types';
import { TaskStatus } from '@/features/tasks/constants/statuses';

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
    onMutate: async (task: Task) => {
      await queryClient.cancelQueries({ queryKey: ['tasks', status] });

      const previousTasks = queryClient.getQueryData<Task[]>(['tasks', status]);

      queryClient.setQueryData<Task[]>(['tasks', status], (oldTasks) =>
        oldTasks ? [...oldTasks, task] : [task],
      );

      return { previousTasks };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(['tasks', status], context.previousTasks);
      }
    },
  });
};

export const useEditTask = (status: TaskStatus) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, task }: { id: number; task: TaskBody }) => taskService.editTask(id, task),
    onMutate: async ({ id, task }) => {
      await queryClient.cancelQueries({ queryKey: ['tasks', status] });

      const previousTasks = queryClient.getQueryData<Task[]>(['tasks', status]);

      queryClient.setQueryData<Task[]>(
        ['tasks', status],
        (oldTasks) =>
          oldTasks?.map((oldTask) => (oldTask.id === id ? { ...oldTask, ...task } : oldTask)) ?? [],
      );

      return { previousTasks };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(['tasks', status], context.previousTasks);
      }
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
    onMutate: async ({ id, status }: { id: number; status: TaskStatus }) => {
      await queryClient.cancelQueries({ queryKey: ['tasks', status] });

      const previousTasks = queryClient.getQueryData<Task[]>(['tasks', status]);

      queryClient.setQueryData<Task[]>(['tasks', status], (oldTasks) =>
        oldTasks?.map((task) => (task.id === id ? { ...task, status } : task)),
      );

      return { previousTasks };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(['tasks', status], context.previousTasks);
      }
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
    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: ['tasks', status] });

      const previousTasks = queryClient.getQueryData<Task[]>(['tasks', status]);

      queryClient.setQueryData<Task[]>(['tasks', status], (oldTasks) =>
        oldTasks?.filter((task) => task.id !== id),
      );

      return { previousTasks };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(['tasks', status], context.previousTasks);
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['tasks', status] });
    },
  });
};
