import { api } from '@/lib/axios';
import { User } from '@/features/profile/types/user.types';

class UserService {
  async getCurrentUser(): Promise<User> {
    const { data } = await api.get<User>('api/users/me');
    return data;
  }
}

export const userService = new UserService();
