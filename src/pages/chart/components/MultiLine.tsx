import { useEffect, useState } from 'react';
import type { Team } from '../interfaces/teamTypes.ts';
import type { SnackImpactDepartment } from '../interfaces/departmentTypes.ts';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface MultiLineProps {
  dataSet: any;
}

const MultiLine = ({ dataSet }: MultiLineProps) => {
  const { title, xKey, yKey, yKey2, xLabel, yLabel, yLabel2, data } = dataSet;
  // const { winWidth } = useDimension();
  const [departs, setDeparts] = useState<Team[] | SnackImpactDepartment[]>([]);

  /*
      - X축: 커피 섭취량(잔/일), 스낵 수
      - 왼쪽 Y축: 버그 수(`bugs`), 회의불참(`meetingMissed`)
      - 오른쪽 Y축: 생산성 점수(`productivity`), 사기(`morale`)
      - 범례(Legend): 팀별 라인 구분
      - 각 팀(Frontend, Backend, AI 등)에 대해 **두 개의 라인** 표시
          - 실선: 버그 수, 회의불참
          - 점선: 생산성, 사기
          - 동일 팀은 동일 색상 유지
      - 데이터 포인트 마커 표시:
          - 원형 → 버그 수, 회의불참
          - 사각형 → 생산성, 사기
      - 데이터 포인트 호버 시 툴팁에 호버된 라인의 포인트 X축에 해당하는 커피 잔수와 버그 수, 생산성 점수를 함께 표시 ( 해당하는 팀의 데이터만 표시되어야 합니다. )
      - 각 데이터 별로 차트 구현
   */

  useEffect(() => {
    console.log(data[0]);
    // Todo:
    //    데이터에 적합한 차트가 없으므로(있지만 모를 수도 있음) 아래와 같이 커스덤해서 만든다.
    //    1. 차트를 부서별로 각 하나씩 총 3개 생성
    //    2. 각 차트를 겹쳐 배치
    //    3. 부서 범례를 따로 추가해 적합 위치에 배치

    // 우선 하나만 가져다 사용 구현
    setDeparts(data);
  }, [dataSet]);

  const getDepartData = (depart: Team | SnackImpactDepartment) =>
    'team' in depart ? depart.team : depart.name;

  const getSeriesData = (depart: Team | SnackImpactDepartment) =>
    'team' in depart ? depart.series : depart.metrics;

  return (
    <div className="flex flex-row justify-between items-center">
      {departs.length > 0 &&
        departs.map((depart) => (
          <div key={getDepartData(depart)} className="w-full sm:w-1/3">
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
                orientation="left"
                width="auto"
                dataKey={yKey}
                stroke="#8884d8"
              />
              <YAxis
                yAxisId="rightId"
                orientation="right"
                width="auto"
                dataKey={yKey2}
                stroke="#82ca9d"
              />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey={yKey}
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey={yKey2} stroke="#82ca9d" />
            </LineChart>
          </div>
        ))}
    </div>
  );
};

export default MultiLine;
