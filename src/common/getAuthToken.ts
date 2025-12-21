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

// Todo: 응답 인터셉터 추가
// axiosInstance.interceptors.response.use(
//   (response) => response,
//
//   // 오류 응답 처리
//   (error) => {
//     // 서버에서 토큰 만료(일반적으로 401) 확인
//     if (error.response && error.response.status === 401) {
//       console.error('인증 토큰 만료 또는 인증 실패. 로그인 페이지로 리다이렉션합니다.');
//
//       // 로컬 스토리지의 만료된 토큰 정보 삭제
//       if (typeof window !== 'undefined') localStorage.removeItem('user');
//       if (typeof window !== 'undefined') window.location.href = '/'; // 홈으로
//     }
//
//     // 다른 모든 오류는 프로미스 거부
//     return Promise.reject(error);
//   },
// );

export default axiosInstance;
