import type { PostResponse } from '../interfaces/addPostTypes.ts';

export interface PostLabels {
  key: keyof PostResponse;
  label: string;
  isShow: boolean;
}

export const postLabels: PostLabels[] = [
  { key: 'id', label: '글번호', isShow: false },
  { key: 'title', label: '제목', isShow: true },
  { key: 'body', label: '내용', isShow: true },
  { key: 'category', label: '분류', isShow: true },
  { key: 'tags', label: '태그', isShow: true },
  { key: 'userId', label: '글쓴이', isShow: true },
  { key: 'createdAt', label: '작성일시', isShow: true },
];
