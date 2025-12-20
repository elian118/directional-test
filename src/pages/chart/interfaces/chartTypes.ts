export interface Coffee {
  brand: string;
  popularity: number;
}

export interface Snack {
  name: string;
  share: number;
}

export interface WeeklyMood {
  week: string; // "2025-01-05",
  happy: number;
  tired: number;
  stressed: number;
}

export interface WeeklyWorkout {
  week: string; // "2025-01-05",
  running: number;
  cycling: number;
  stretching: number;
}
