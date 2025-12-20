export interface Metric {
  snacks: number;
  meetingsMissed: number;
  morale: number;
}

export interface Department {
  name: string;
  metrics: Metric[];
}
export interface SnackImpactByDepartment {
  departments: Department[];
}
