import BarAndDonut from './BarAndDonut.tsx';
import { useAsync } from '../../../common/hooks/useAsync.ts';
import { useState } from 'react';
import type {
  PopularSnackBrandItem,
  TopCoffeeBrandItem,
  WeeklyMoodItem,
  WeeklyWorkoutItem,
} from '../interfaces/chartTypes.ts';
import { dataSet } from '../consts/dataSet.ts';
import StackedBarAndArea from './StackedBarAndArea.tsx';
import MultiLine from './MultiLine.tsx';

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
  // | CoffeeTeam
  // | SnackImpactResponse;
}

const ChartContainer = () => {
  const [data, setData] = useState<ChartData>(initChartData);
  const [dataSetIdx, setDataSetIdx] = useState<number>(0);

  const getData = async () => {
    const { api, ...rest } = dataSet[dataSetIdx];
    const res = await api();
    setData({ ...rest, data: res });
    // console.log('{ ...rest, data: res }');
    // console.log({ ...rest, data: res });
  };

  useAsync(async () => {
    await getData();
  }, [dataSetIdx]);

  return (
    <div>
      <div className="w-full flex justify-center items-center">
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
