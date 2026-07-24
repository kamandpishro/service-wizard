import axios from 'axios';
import toast from 'react-hot-toast';

export const apiClient = axios.create({
  baseURL: 'https://run.mocky.io/v3',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error?.response?.status;

      if (status === 401) {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
      } else if (status === 403) {
        toast.error('شما دسترسی لازم برای این عملیات را ندارید.');
      } else if (status >= 500) {
        toast.error('خطایی در سمت سرور رخ داده است. لطفاً بعداً تلاش کنید.');
      } else {
        toast.error('خطا در اتصال به شبکه. لطفا وضعیت اینترنت خود را بررسی کنید.');
      }
    }
    return Promise.reject(error);
  },
);
