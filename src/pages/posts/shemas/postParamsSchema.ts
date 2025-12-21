import { z } from 'zod';
import { Category } from '../postsConsts.ts';

export const postParamsSchema = z.object({
  title: z
    .string({ error: '제목은 필수 입력 항목입니다.' })
    .min(2, '제목은 최소 2자 이상이어야 합니다.')
    .max(100, '제목은 100자 이하로 입력해야 합니다.'),
  body: z.string({ error: '내용은 필수 입력 항목입니다.' }).min(10, '내용은 최소 10자 이상이어야 합니다.'),
  category: z.enum(Category, { error: '분류를 선택하세요.' }),
  tags: z.array(z.string()).optional(),
});

export type PostFormSchemaParams = z.infer<typeof postParamsSchema>;
