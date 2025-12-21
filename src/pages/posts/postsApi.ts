import axiosInstance from '../../common/consts.ts';
import type { PostsParams, PostListResponse } from './interfaces/getPostsTypes.ts';
import type { PostCreateRequest, PostResponse } from './interfaces/addPostTypes.ts';
import type { DeleteResponse } from '../../common/types/DeleteResponse.ts';

// 내 포스트 목록 조회
export const getPostsApi = async (params: PostsParams): Promise<PostListResponse> => {
  const response = await axiosInstance.get(`/posts`, {
    params: params,
  });
  return response.data;
};

// 내 포스트 단 건 조회
export const getPostApi = async (postId: string): Promise<PostResponse> => {
  const response = await axiosInstance.get(`/posts/${postId}`);
  return response.data;
};

// 내 포스트 작성
export const addPostApi = async (params: PostCreateRequest): Promise<PostResponse> => {
  const response = await axiosInstance.post(`/posts`, params);
  return response.data;
};

// 내 포스트 부분 업데이트
export const updatePostApi = async (postId: string, params: PostCreateRequest): Promise<PostResponse> => {
  const response = await axiosInstance.patch(`/posts/${postId}`, params);
  return response.data;
};

// 내 포스트 삭제(단건)
export const delPostApi = async (postId: string): Promise<DeleteResponse> => {
  const response = await axiosInstance.delete(`/posts/${postId}`);
  return response.data;
};

// 내 모든 포스트 삭제
export const delAllPostsApi = async (): Promise<DeleteResponse> => {
  const response = await axiosInstance.delete(`/posts`);
  return response.data;
};

// Mock 포스트 목록 조회
export const getMockPostsApi = async (count: number): Promise<PostListResponse> => {
  const response = await axiosInstance.get(`/mock/posts?count=${count}`);
  return response.data;
};
