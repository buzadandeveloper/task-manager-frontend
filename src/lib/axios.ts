import axios from 'axios';
import { requestInterceptor, requestErrorInterceptor } from '@/interceptors/request';
import { responseInterceptor, responseErrorInterceptor } from '@/interceptors/response';

const options = {
  baseURL: process.env.APP_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
};

export const api = axios.create(options);

api.interceptors.request.use(requestInterceptor, requestErrorInterceptor);
api.interceptors.response.use(responseInterceptor, responseErrorInterceptor);
