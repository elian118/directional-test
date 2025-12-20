import axiosInstance from '../../common/consts.ts';
import type { PostsParams, PostsResponse } from './postsTypes.ts';

export const postsApi = async (parmas: PostsParams): Promise<PostsResponse> => {
  const response = await axiosInstance.get(`/posts`, {
    params: parmas,
  });
  return response.data;
};
