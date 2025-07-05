import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { taskService } from '@/features/tasks/services/task.service';
import { Task, TaskBody } from '@/features/tasks/types/task.types';
import { TaskStatus } from '@/features/tasks/constants/statuses';

export const useGetTasks = () => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: () => taskService.getTasks(),
  });
};

export const useFilterTasksByStatus = (status: number) => {
  return useQuery({
    queryKey: ['tasks', 'filter', status],
    queryFn: () => taskService.filterTasksByStatus(status),
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (task: Task) => taskService.createTask(task),
    onSuccess: (newTask) => {
      queryClient.setQueryData<Task[]>(['tasks'], (oldTasks) =>
        oldTasks ? [...oldTasks, newTask] : [newTask],
      );
    },
  });
};

export const useEditTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, task }: { id: number; task: TaskBody }) => taskService.editTask(id, task),
    onSuccess: (_, variables) => {
      queryClient.setQueryData<Task[]>(['tasks'], (oldTasks) =>
        oldTasks?.map((task) => (task.id === variables.id ? { ...task, ...variables.task } : task)),
      );
    },
  });
};

export const useUpdateTaskStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: TaskStatus }) =>
      taskService.updateTaskStatus(id, status),
    onSuccess: (_, variables) =>
      queryClient.setQueryData<Task[]>(['tasks'], (oldTasks) =>
        oldTasks?.map((task) =>
          task.id === variables.id ? { ...task, status: variables.status } : task,
        ),
      ),
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => taskService.deleteTask(id),
    onSuccess: (_, removeId) => {
      queryClient.setQueryData<Task[]>(['tasks'], (oldTasks) =>
        oldTasks?.filter((task) => task.id !== removeId),
      );
    },
  });
};
