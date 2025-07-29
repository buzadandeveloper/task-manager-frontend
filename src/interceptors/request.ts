import { InternalAxiosRequestConfig, AxiosError } from 'axios';
import { getCookie } from 'cookies-next';
import { showToast } from '@/lib/show-toast';

const requestInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const token = getCookie('token');

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

const requestErrorInterceptor = async (error: AxiosError) => {
  showToast({ title: 'Error', description: 'Something went wrong.', variant: 'destructive' });

  return Promise.reject(error);
};

export { requestInterceptor, requestErrorInterceptor };
