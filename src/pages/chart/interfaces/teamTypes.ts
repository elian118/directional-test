export interface CoffeeDataPoint {
  cups: number;
  bugs: number;
  productivity: number;
}

export interface Team {
  team: string;
  series: CoffeeDataPoint[];
}

export interface CoffeeTeam {
  teams: Team[];
}
