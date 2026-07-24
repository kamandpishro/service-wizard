import axios from 'axios';
import toast from 'react-hot-toast';
import IApiErrorResponse from './type';

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
      config.headers.Authorization = `Bearer ${token}`;
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
    if (!error.response) {
      toast.error('خطا در اتصال به شبکه. لطفاً وضعیت اینترنت خود را بررسی کنید.');
      return Promise.reject(error);
    }
    const status = error.response.status;
    const data = error.response.data as IApiErrorResponse | null;
    const backendMessage = data?.message;

    if (status === 401) {
      if (typeof window !== 'undefined') {
        toast.error(backendMessage || 'لطفا مجددا وارد شوید.');
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    } else if (status === 403) {
      toast.error(backendMessage || 'شما دسترسی لازم برای این عملیات را ندارید.');
    } else if (status >= 500) {
      toast.error(backendMessage || 'خطایی در سمت سرور رخ داده است. لطفاً بعداً تلاش کنید.');
    } else {
      toast.error(backendMessage || 'درخواست با خطا مواجه شد.');
    }
    return Promise.reject(error);
  },
);
