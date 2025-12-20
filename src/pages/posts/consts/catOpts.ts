import { Category } from '../postsConsts.ts';

export interface CatOpt {
  key: Category;
  isShow: boolean;
}

export const initCatOpts: CatOpt[] = Object.values(Category).map((e) => ({
  key: e,
  isShow: true,
}));
