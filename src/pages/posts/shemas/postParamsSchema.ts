import { z } from 'zod';
import { Category } from '../postsConsts.ts';

const BANNED_WORDS = ['캄보디아', '프놈펜', '불법체류', '텔레그램'];
const BANNED_WORD_ERROR_MESSAGE = '금칙어가 포함되었습니다.';

const containsBannedWords = (text: string): boolean => {
  if (!text) return false;
  const lowerCaseText = text.toLowerCase();
  return BANNED_WORDS.some((word) => lowerCaseText.includes(word));
};

export const postParamsSchema = z.object({
  title: z
    .string({ error: '제목은 필수 입력 항목입니다.' })
    .min(2, '제목은 최소 2자 이상이어야 합니다.')
    .max(100, '제목은 100자 이하로 입력해야 합니다.')
    .refine((value) => !containsBannedWords(value), {
      message: BANNED_WORD_ERROR_MESSAGE,
      path: ['title'],
    }),
  body: z
    .string({ error: '내용은 필수 입력 항목입니다.' })
    .min(10, '내용은 최소 10자 이상이어야 합니다.')
    .refine((value) => !containsBannedWords(value), {
      message: BANNED_WORD_ERROR_MESSAGE,
      path: ['body'],
    }),
  category: z.enum(Category, { error: '분류를 선택하세요.' }),
  tags: z
    .array(z.string())
    .optional()
    .refine(
      (tagArray) => {
        if (!tagArray || tagArray.length === 0) return true; // 태그 없으면 통과
        return !tagArray.some((tag) => containsBannedWords(tag));
      },
      {
        message: BANNED_WORD_ERROR_MESSAGE,
        path: ['tags'],
      },
    ),
});

export type PostFormSchemaParams = z.infer<typeof postParamsSchema>;
