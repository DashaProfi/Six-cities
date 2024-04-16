import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  AxiosRequestConfig,
} from 'axios';
import { getToken } from './token';
import { BACKEND_URL, HttpCode, REQUEST_TIMEOUT } from '../const/api-const';

export const createApi = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      throw error;
    }
  );

  api.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = getToken();
    if (token && config.headers) {
      config.headers['x-token'] = token;
    }
    return config;
  });
  return api;
};
