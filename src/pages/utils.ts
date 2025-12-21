// 데이터 가공
import type { CoffeeTeam } from './chart/interfaces/teamTypes.ts';

export const transformCoffeeTeamData = (data: CoffeeTeam, metric: 'bugs' | 'productivity') => {
  const transformedData: any[] = [];

  // 컵 수 (X축) 기준으로 데이터 통합
  data.teams[0].series.forEach((_, index) => {
    const newEntry: { [key: string]: any } = {
      cups: data.teams[0].series[index].cups,
    };

    data.teams.forEach((teamEntry) => {
      // 키 이름: "Frontend_bugs", "Backend_bugs" 와 같이 만듦
      const keyName = `${teamEntry.team}_${metric}`;
      newEntry[keyName] = teamEntry.series[index][metric];
    });

    transformedData.push(newEntry);
  });

  return transformedData;
};
