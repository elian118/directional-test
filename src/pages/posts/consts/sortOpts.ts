import { Sort } from '../postsConsts.ts';

export interface SortOpt {
  key: Sort;
  value: string;
  label: string;
}

export const sortOpts: SortOpt[] = Object.values(Sort).map((e, idx) => ({
  key: e,
  value: e,
  label: idx > 0 ? '작성일시' : '제목',
}));
