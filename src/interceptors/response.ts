import { AxiosResponse, AxiosError } from 'axios';
import { showToast } from '@/lib/show-toast';
import { deleteCookie } from 'cookies-next';

const responseInterceptor = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const responseErrorInterceptor = async (error: AxiosError) => {
  const { response } = error;

  if (response?.status === 401) {
    deleteCookie('token');
    window.location.href = '/login';
  }

  showToast({ title: 'Error', description: 'Something went wrong.' });

  return Promise.reject(error);
};

export { responseInterceptor, responseErrorInterceptor };
