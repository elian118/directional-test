import { z } from 'zod';

export const loginParamsSchema = z.object({
  email: z.email({ error: '이메일을 입력하세요' }),
  password: z.string({ error: '비밀번호를 입력하세요' }).min(2, '최소 2자 이상 입력해주세요'),
});

export type LoginParams = z.infer<typeof loginParamsSchema>;

export const initLoginParams: LoginParams = {
  email: '',
  password: '',
};
