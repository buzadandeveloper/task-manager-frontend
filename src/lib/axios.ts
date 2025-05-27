import axios from 'axios';
import { requestInterceptor, requestErrorInterceptor } from '@/interceptors/request';
import { responseInterceptor, responseErrorInterceptor } from '@/interceptors/response';

const options = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
};

export const api = axios.create(options);

api.interceptors.request.use(requestInterceptor, requestErrorInterceptor);
api.interceptors.response.use(responseInterceptor, responseErrorInterceptor);
