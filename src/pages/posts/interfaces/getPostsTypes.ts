import type { Category, Order, Sort } from '../postsConsts.ts';
import type { PostResponse } from './addPostTypes.ts';

export interface PostsParams {
  limit: number; // 페이지 크기 (1~100) 기본값 10 설정
  prevCursor?: string; // 이전 페이지용 커서(opaque). 이전 응답의 prevCursor를 그대로 전달. nextCursor와 동시 사용 불가.
  nextCursor?: string; // 다음 페이지용 커서(opaque). 이전 응답의 nextCursor를 그대로 전달. prevCursor와 동시 사용 불가.
  sort?: Sort; // 정렬 필드
  order?: Order; //정렬 방향
  category?: Category; // 구분
  from?: string; // $date-time
  to?: string; // $date-time
  search?: string; // 제목/본문 검색어 (공백으로 여러 단어 입력 시 AND 매칭)
}

export interface PostsResponse {
  items: PostResponse[];
  prevCursor: any;
  nextCursor: any;
}

export const initialPostsParams: PostsParams = { limit: 10 };
