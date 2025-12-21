import { Order } from '../postsConsts.ts';

export interface OrderOpt {
  key: Order;
  value: string;
  label: string;
}

export const orderOpts: OrderOpt[] = Object.values(Order).map((e, idx) => ({
  key: e,
  value: e.toLowerCase(),
  label: idx > 0 ? '내림차순' : '오름차순',
}));
