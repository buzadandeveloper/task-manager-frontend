import { InternalAxiosRequestConfig, AxiosError } from 'axios';
import { getCookie } from 'cookies-next';

const requestInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const token = getCookie('token');

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

const requestErrorInterceptor = async (error: AxiosError) => {
  return Promise.reject(error);
};

export { requestInterceptor, requestErrorInterceptor };
