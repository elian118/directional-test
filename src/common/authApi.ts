import axiosInstance from './getAuthToken.ts';
import type { LoginRequest } from './types/LoginRequest.ts';
import type { LoginResponse } from './types/LoginResponse.ts';

export const loginApi = async (params: LoginRequest): Promise<LoginResponse> => {
  const response = await axiosInstance.post(`/auth/login`, params);
  return response.data;
};
