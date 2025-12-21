export interface TopCoffeeBrandItem {
  brand: string;
  popularity: number;
}

export interface PopularSnackBrandItem {
  name: string;
  share: number;
}

export interface WeeklyMoodItem {
  week: string;
  happy: number;
  tired: number;
  stressed: number;
}

export interface WeeklyWorkoutItem {
  week: string; // "2025-01-05",
  running: number;
  cycling: number;
  stretching: number;
}
