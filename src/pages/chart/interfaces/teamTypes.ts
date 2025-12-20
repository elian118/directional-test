export interface ASeries {
  cups: number;
  bugs: number;
  productivity: number;
}

export interface Team {
  team: string;
  series: ASeries[];
}

export interface CoffeeConsumptionByTeam {
  teams: Team[];
}
