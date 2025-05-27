import { useQueryClient } from '@tanstack/react-query';

export function useQueryData<T>(key: string | unknown[]): T | undefined {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<T>(Array.isArray(key) ? key : [key]);

  return data;
}
