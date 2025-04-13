import { AxiosResponse, AxiosError } from 'axios';

const responseInterceptor = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const responseErrorInterceptor = async (error: AxiosError) => {
  const { response } = error;

  if (response?.status === 401) {
    window.location.href = '/login';
  }

  return Promise.reject(error);
};

export { responseInterceptor, responseErrorInterceptor };
