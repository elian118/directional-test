export interface SnackImpactDataPoint {
  snacks: number;
  meetingsMissed: number;
  morale: number;
}

export interface SnackImpactDepartment {
  name: string;
  metrics: SnackImpactDataPoint[];
}
export interface SnackImpactResponse {
  departments: SnackImpactDepartment[];
}
