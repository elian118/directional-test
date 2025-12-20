import { Category } from '../postsConsts.ts';
import { getRandomInt } from '../../../common/utils.ts';

const categories: Category[] = Object.values(Category);
const tags = ['react', 'typescript', 'nextjs', 'tailwind', 'prisma'];

export const testPosts = new Array(500).fill({}).map((e, idx) => ({
  ...e,
  title: `내 샘플 포스트 #${idx + 1}`,
  body: `이것은 직접 등록한 테스트용 포스트 본문입니다. (${idx + 1})번째 포스트`,
  category: categories[getRandomInt(categories.length - 1)],
  tags: [tags[getRandomInt(tags.length - 1)]],
}));
