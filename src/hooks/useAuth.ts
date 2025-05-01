import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '@/src/services/auth.service';

export const useLoginWithGoogle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authService.loginWithGoogle(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['current-user'] });
    },
  });
};

export const useLoginWithGitHub = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authService.loginWithGitHub(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['current-user'] });
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['current-user'] });
    },
  });
};
