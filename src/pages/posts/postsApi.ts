import axiosInstance from '../../common/consts.ts';
import type { PostsParams, PostsResponse } from './interfaces/getPostsTypes.ts';
import type { PostParams, PostResponse } from './interfaces/addPostTypes.ts';
import type { DelPostResponse } from './interfaces/delPostsTypes.ts';

// 내 포스트 목록 조회
export const getPostsApi = async (params: PostsParams): Promise<PostsResponse> => {
  const response = await axiosInstance.get(`/posts`, {
    params: params,
  });
  return response.data;
};

// 내 포스트 단 건 조회
export const getPostApi = async (postId: number): Promise<PostResponse> => {
  const response = await axiosInstance.get(`/posts/${postId}`);
  return response.data;
};

// 내 포스트 작성
export const addPostApi = async (params: PostParams): Promise<PostResponse> => {
  const response = await axiosInstance.post(`/posts`, { params });
  return response.data;
};

// 내 포스트 부분 업데이트
export const updatePostApi = async (postId: number, params: PostParams): Promise<PostResponse> => {
  const response = await axiosInstance.patch(`/posts/${postId}`, { params });
  return response.data;
};

// 내 포스트 삭제(단건)
export const delPostApi = async (postId: number): Promise<DelPostResponse> => {
  const response = await axiosInstance.delete(`/posts/${postId}`);
  return response.data;
};

// 내 모든 포스트 삭제
export const delAllPostsApi = async (): Promise<DelPostResponse> => {
  const response = await axiosInstance.delete(`/posts`);
  return response.data;
};

// Mock 포스트 목록 조회
export const getMockPostsApi = async (count: number): Promise<PostsResponse> => {
  const response = await axiosInstance.delete(`/mock/posts/${count}`);
  return response.data;
};
