import type { AxiosInstance } from 'axios';
import axios from 'axios';

export const getAuthToken = (): string => {
  if (typeof window === 'undefined') {
    return ''; // 서버 환경에서는 로컬 스토리지가 없으므로 빈 문자열 반환
  }

  const userString = localStorage.getItem('user');
  if (userString) {
    try {
      const user = JSON.parse(userString);
      return user?.token || '';
    } catch (e) {
      console.error('로컬 스토리지 "user" 파싱 오류:', e);
      return '';
    }
  }
  return '';
};

const AUTH_TOKEN: string = getAuthToken();
const BASE_URL: string = import.meta.env.VITE_BASE_URL;

if (!AUTH_TOKEN) console.warn('인증 토큰이 확인되지 않습니다.');

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${AUTH_TOKEN}`,
  },
});

export default axiosInstance;
