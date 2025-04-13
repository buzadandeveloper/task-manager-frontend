import { api } from '@/src/lib/axios';

class AuthService {
  async loginWithGoogle(): Promise<void> {
    const { data } = await api.get<void>('/auth/google');
    return data;
  }

  async loginWithGitHub(): Promise<void> {
    const { data } = await api.get<void>('/auth/github');
    return data;
  }

  async logout(): Promise<void> {
    const { data } = await api.get<void>('/auth/logout');
    return data;
  }
}

export const authService = new AuthService();
