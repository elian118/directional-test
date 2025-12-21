import type { PopularSnackBrandItem, TopCoffeeBrandItem, WeeklyMoodItem, WeeklyWorkoutItem } from './chartTypes.ts';
import type { CoffeeTeam } from './teamTypes.ts';
import type { SnackImpactResponse } from './departmentTypes.ts';

export interface ColoredCoffeeBrandItem extends TopCoffeeBrandItem {
  color: string;
}

export interface ColoredPopularSnackBrandItem extends PopularSnackBrandItem {
  color: string;
}

export interface ColoredWeeklyMoodItem extends WeeklyMoodItem {
  color: string;
}

export interface ColoredWeeklyWorkoutItem extends WeeklyWorkoutItem {
  color: string;
}

export interface ColoredCoffeeTeam extends CoffeeTeam {
  color: string;
}
export interface ColoredSnackImpactResponse extends SnackImpactResponse {
  color: string;
}
