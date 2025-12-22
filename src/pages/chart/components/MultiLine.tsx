import { useEffect, useState } from 'react';
import type { Team } from '../interfaces/teamTypes.ts';
import type { SnackImpactDepartment } from '../interfaces/departmentTypes.ts';
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from 'recharts';
import StyledTooltip from './StyledTooltip.tsx';

interface MultiLineProps {
  dataSet: any;
}

const MultiLine = ({ dataSet }: MultiLineProps) => {
  const { title, xKey, yKey, yKey2, xLabel, yLabel, yLabel2, data } = dataSet;
  // const { winWidth } = useDimension();
  const [departs, setDeparts] = useState<Team[] | SnackImpactDepartment[]>([]);

  /*
      - 범례(Legend): 팀별 라인 구분
      - 각 팀(Frontend, Backend, AI 등)에 대해 **두 개의 라인** 표시
          - 실선: 버그 수, 회의불참
          - 점선: 생산성, 사기
          - 동일 팀은 동일 색상 유지
      - 데이터 포인트 마커 표시:
          - 원형 → 버그 수, 회의불참
          - 사각형 → 생산성, 사기
   */

  useEffect(() => {
    // Todo:
    //    데이터에 적합한 차트가 없으므로(있지만 모를 수도 있음) 아래와 같이 커스덤해서 만든다.
    //    1. 차트를 부서별로 각 하나씩 총 3개 생성
    //    2. 각 차트를 겹쳐 배치
    //    3. 부서 범례를 따로 추가해 적합 위치에 배치
    setDeparts(data);
  }, [dataSet]);

  const getDepartData = (depart: Team | SnackImpactDepartment) =>
    'team' in depart ? depart.team : depart.name;

  const getSeriesData = (depart: Team | SnackImpactDepartment) =>
    'team' in depart ? depart.series : depart.metrics;

  const getDepartName = (depart: Team | SnackImpactDepartment) =>
    'team' in depart ? depart.team : depart.name;

  const departColors = ['#3EBFAE', '#F06565', '#A855F7'];

  return (
    <div className="mt-4 flex flex-col justify-between items-center">
      <div className="w-full flex items-center justify-center">
        <h2 className="mb-4">{title}</h2>
      </div>
      {departs.length > 0 &&
        departs.map((depart, idx) => (
          <div
            key={getDepartData(depart)}
            className="w-full md:w-3/4 xl:w-9/12"
          >
            <LineChart
              style={{
                width: '100%',
                maxWidth: '100%',
                height: '100%',
                maxHeight: '70vh',
                aspectRatio: 1.618,
              }}
              responsive
              data={getSeriesData(depart)}
              margin={{
                top: 10,
                right: 10,
                left: 10,
                bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey={xKey}
                label={{
                  position: 'insideBottomRight',
                  value: xLabel,
                  dx: 5,
                  dy: 20,
                }}
              />
              <YAxis
                yAxisId="leftId"
                name={yLabel}
                label={{
                  position: 'insideTopLeft',
                  value: yLabel,
                  dx: 0,
                  dy: 80,
                  angle: -90,
                  stroke: '#8884d8',
                }}
                orientation="left"
                width="auto"
                dataKey={yKey}
                stroke="#8884d8"
              />
              <YAxis
                yAxisId="rightId"
                name={yLabel2}
                label={{
                  position: 'insideTopRight',
                  value: yLabel2,
                  dx: 0,
                  dy: 50,
                  angle: 90,
                  stroke: '#82ca9d',
                }}
                orientation="right"
                width="auto"
                dataKey={yKey2}
                stroke="#82ca9d"
              />
              <StyledTooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey={yKey}
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey={yKey2}
                stroke="#82ca9d"
                strokeDasharray="5 5"
              />
            </LineChart>

            <div className="mt-4 w-full flex justify-center items-center">
              <h2>{getDepartName(depart)}</h2>
            </div>
          </div>
        ))}
    </div>
  );
};

export default MultiLine;
