import BarAndDonut from './BarAndDonut.tsx';
import { useAsync } from '../../../common/hooks/useAsync.ts';
import { useState } from 'react';
import type {
  PopularSnackBrandItem,
  TopCoffeeBrandItem,
  WeeklyMoodItem,
  WeeklyWorkoutItem,
} from '../interfaces/chartTypes.ts';
import type { CoffeeTeam } from '../interfaces/teamTypes.ts';
import type { SnackImpactResponse } from '../interfaces/departmentTypes.ts';
import { dataSet } from '../consts/dataSet.ts';

const initChartData: ChartData = {
  title: '',
  xKey: '',
  yKey: '',
  xLabel: '',
  yLabel: '',
  data: [],
};

export interface ChartData {
  title: string;
  xKey: string;
  yKey: string;
  xLabel: string;
  yLabel: string;
  data:
    | TopCoffeeBrandItem[]
    | PopularSnackBrandItem[]
    | WeeklyMoodItem[]
    | WeeklyWorkoutItem[]
    | CoffeeTeam[]
    | SnackImpactResponse[];
}

const ChartContainer = () => {
  const [data, setData] = useState<ChartData>(initChartData);
  const [dataSetIdx, setDataSetIdx] = useState<number>(0);

  const getData = async () => {
    const { api, ...rest } = dataSet[dataSetIdx];
    const res = await api();
    console.log(res);
    setData({ ...rest, data: res });
  };

  useAsync(async () => {
    await getData();
  }, [dataSetIdx]);

  return (
    <div>
      <div>
        <fieldset className="fieldset">
          <legend className="pl-2 fieldset-legend">데이터셋</legend>
          <select
            className="select"
            onChange={async (e) => {
              setDataSetIdx(dataSet.findIndex((d) => d.title === e.target.value));
            }}
          >
            {dataSet.map((opt) => (
              <option key={opt.title} value={opt.title}>
                {opt.title}
              </option>
            ))}
          </select>
        </fieldset>
      </div>
      {dataSetIdx < 2 && <BarAndDonut dataSet={data} />}
    </div>
  );
};

export default ChartContainer;
