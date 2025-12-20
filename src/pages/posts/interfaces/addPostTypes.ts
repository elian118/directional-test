import type { Category } from '../postsConsts.ts';

export interface PostCreateRequest {
  title: string;
  body: string;
  category: Category;
  tags: string[];
}

export interface PostResponse {
  id: string;
  userId: string;
  title: string;
  body: string;
  category: Category;
  tags: string[];
  createdAt: string; // '2025-12-20T01:46:19.350Z';
}

export const initPostParams: PostCreateRequest = {
  title: '',
  body: '',
  category: 'NOTICE',
  tags: [],
};
