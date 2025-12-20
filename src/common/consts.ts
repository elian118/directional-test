import type { AxiosInstance } from 'axios';
import axios from 'axios';

const AUTH_TOKEN: string = import.meta.env.VITE_AUTH_TOKEN;
const BASE_URL: string = import.meta.env.VITE_BASE_URL;

if (!AUTH_TOKEN) console.error('토큰이 확인되지 않습니다.');

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${AUTH_TOKEN}`,
  },
});

export default axiosInstance;
