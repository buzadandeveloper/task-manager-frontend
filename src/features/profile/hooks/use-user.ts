import { useQuery } from '@tanstack/react-query';
import { userService } from '@/features/profile/services/user.service';

export const useUser = () => {
  return useQuery({
    queryKey: ['current-user'],
    queryFn: () => userService.getCurrentUser(),
  });
};
