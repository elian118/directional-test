export const Sort = {
  CreatedAt: 'createdAt',
  Title: 'title',
};

export const Order = {
  ASC: 'asc',
  DESC: 'desc',
} as const;

export const Category = {
  NOTICE: 'NOTICE',
  QNA: 'QNA',
  FREE: 'FREE',
} as const;

export type Sort = (typeof Sort)[keyof typeof Sort];
export type Order = (typeof Order)[keyof typeof Order];
export type Category = (typeof Category)[keyof typeof Category];
