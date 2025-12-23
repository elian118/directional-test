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
import { usePrevious } from '../../../common/hooks/usePrevious.ts';

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

  // 이전 데이터셋 인덱스 저장 → 추적용
  const prevDataSetIdx = usePrevious(dataSetIdx);

  useAsync(async () => {
    /*
      차트 유형이 멀티라인으로 바뀔 때만 컨테이너 리랜더링 유도
        DEBUG 2, 3 인덱스 차트 데이터가 잔류 시 4, 5 차트 랜더링에 영향 줌 → 의도하지 않은 차트가 그려짐
      원인: 2~3 차트와 4~5 차트 유형이 비슷하기 때문에 잔류 데이터가 추가 차트 생성 야기
        그 외 케이스는 데이터셋 전환 시 부드럽게 차트가 변하는 애니메이션을 살리기 위해 컨테이너 리랜더링 차단
     */
    const isTransitionToMultiLine =
      (prevDataSetIdx === 2 || prevDataSetIdx === 3) && (dataSetIdx === 4 || dataSetIdx === 5);

    isTransitionToMultiLine && setData(initChartData); // 잔류 데이터 제거 및 리렌더링 유도
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
