import type { PopularSnackBrandItem, TopCoffeeBrandItem } from './chartTypes.ts';

export interface ColoredCoffeeBrandItem extends TopCoffeeBrandItem {
  color: string; // TopCoffeeBrandItem의 모든 속성을 상속받고 color만 추가
}

export interface ColoredPopularSnackBrandItem extends PopularSnackBrandItem {
  color: string; // TopCoffeeBrandItem의 모든 속성을 상속받고 color만 추가
}
