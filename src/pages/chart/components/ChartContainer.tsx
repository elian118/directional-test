import BarAndDonut from './BarAndDonut.tsx';
import { useAsync } from '../../../common/hooks/useAsync.ts';
import { useState } from 'react';
import type {
  PopularSnackBrandItem,
  TopCoffeeBrandItem,
  WeeklyMoodItem,
  WeeklyWorkoutItem,
} from '../interfaces/chartTypes.ts';
import { dataSet, seriesDataSet } from '../consts/dataSet.ts';
import StackedBarAndArea from './StackedBarAndArea.tsx';
import MultiLine from './MultiLine.tsx';
import type { CoffeeTeam } from '../interfaces/teamTypes.ts';
import type { SnackImpactResponse } from '../interfaces/departmentTypes.ts';

const initChartData: ChartData = {
  title: '',
  xKey: '',
  yKey: '',
  yKey2: '',
  yKey3: '',
  xLabel: '',
  yLabel: '',
  yLabel2: '',
  yLabel3: '',
  data: [],
};

export interface ChartData {
  title: string;
  xKey: string;
  yKey: string;
  yKey2?: string;
  yKey3?: string;
  xLabel: string;
  yLabel: string;
  yLabel2?: string;
  yLabel3?: string;
  data: TopCoffeeBrandItem[] | PopularSnackBrandItem[] | WeeklyMoodItem[] | WeeklyWorkoutItem[];
}

export interface SeriesChartData {
  title: string;
  xKey: string;
  yKey: string;
  xLabel: string;
  yLabel: string;
  data: CoffeeTeam | SnackImpactResponse;
}

const ChartContainer = () => {
  const [data, setData] = useState<ChartData>(initChartData);
  const [dataSetIdx, setDataSetIdx] = useState<number>(0);

  const getData = async () => {
    const { api, ...rest } = dataSet[dataSetIdx];
    const res = await api();
    setData({ ...rest, data: res });
  };

  const getSeriesData = async () => {
    const { api, target, ...rest } = seriesDataSet[dataSetIdx - 4];
    const res = await api();
    // @ts-ignore
    const data = res[target];
    setData({ ...rest, data });
  };

  useAsync(async () => {
    dataSetIdx < 4 ? await getData() : await getSeriesData();
  }, [dataSetIdx]);

  return (
    <div>
      <div className="w-full flex justify-center items-center">
        <fieldset className="fieldset">
          <legend className="pl-2 fieldset-legend">데이터셋</legend>
          <select
            className="select"
            onChange={async (e) => {
              setDataSetIdx([...dataSet, ...seriesDataSet].findIndex((d) => d.title === e.target.value));
            }}
          >
            {[...dataSet, ...seriesDataSet].map((opt) => (
              <option key={opt.title} value={opt.title}>
                {opt.title}
              </option>
            ))}
          </select>
        </fieldset>
      </div>
      {dataSetIdx < 2 ? (
        <BarAndDonut dataSet={data} />
      ) : dataSetIdx >= 2 && dataSetIdx < 4 ? (
        <StackedBarAndArea dataSet={data} />
      ) : (
        <MultiLine dataSet={data} />
      )}
    </div>
  );
};

export default ChartContainer;
