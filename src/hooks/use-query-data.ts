import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export function useQueryData<T>(key: string | unknown[]): T | undefined {
  const queryClient = useQueryClient();
  const [data, setData] = useState<T | undefined>(
    queryClient.getQueryData<T>(Array.isArray(key) ? key : [key]),
  );

  useEffect(() => {
    const unsubscribe = queryClient.getQueryCache().subscribe((event) => {
      if (event?.query?.queryKey?.[0] === (Array.isArray(key) ? key[0] : key)) {
        const newData = queryClient.getQueryData<T>(Array.isArray(key) ? key : [key]);
        setData(newData);
      }
    });

    return () => unsubscribe();
  }, [queryClient, key]);

  return data;
}
