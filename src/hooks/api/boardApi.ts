import axiosInstance from './common.ts';
import type { PostsParams, PostsResponse } from '../../types/boardTypes.ts';

export const boardApi = async (parmas: PostsParams): Promise<PostsResponse> => {
  const response = await axiosInstance.get(`/posts`, {
    params: parmas,
  });
  return response.data;
};
