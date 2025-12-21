import { z } from 'zod';
import { Category, Order, Sort } from '../postsConsts.ts';

const dateRangeSchema = z
  .object({
    from: z.date().optional(),
    to: z.date().optional(),
  })
  .optional()
  .nullable();

export const postsSearchParamsSchema = z.object({
  search: z.string().optional().nullable(),
  category: z.enum(Category).optional().nullable(),
  sort: z.enum(Sort).optional(),
  order: z.enum(Order).optional(),
  dateRange: dateRangeSchema,
});

export type PostsSearchParams = z.infer<typeof postsSearchParamsSchema>;

export const initPostsSearchParams: PostsSearchParams = {
  search: '',
  category: undefined,
  sort: Sort.Title,
  order: Order.ASC,
  dateRange: undefined,
};
