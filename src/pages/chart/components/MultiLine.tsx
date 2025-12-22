import { useEffect } from 'react';

interface MultiLineProps {
  dataSet: any;
}

const MultiLine = ({ dataSet }: MultiLineProps) => {
  const { title, xKey, yKey, yKey2, xLabel, yLabel, yLabel2, data } = dataSet;
  // const { winWidth } = useDimension();

  useEffect(() => {
    console.log(data);
    // Todo:
    //    데이터에 적합한 차트가 없으므로(있지만 모를 수도 있음) 아래와 같이 커스덤해서 만든다.
    //    1. 차트를 부서별로 각 하나씩 총 3개 생성
    //    2. 각 차트를 겹쳐 배치
    //    3. 부서 범례를 따로 추가해 적합 위치에 배치
  }, [dataSet]);

  return <></>;
};

export default MultiLine;
