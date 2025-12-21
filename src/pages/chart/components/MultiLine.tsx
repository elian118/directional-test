import type { ChartData } from './ChartContainer.tsx';
import { useDimension } from '../../../common/hooks/useDimention.ts';
import { useEffect } from 'react';

interface MultiLineProps {
  dataSet: ChartData;
}

const MultiLine = ({ dataSet }: MultiLineProps) => {
  const { title, xKey, yKey, yKey2, xLabel, yLabel, yLabel2, data } = dataSet;
  const { winWidth } = useDimension();

  useEffect(() => {
    //
  }, [dataSet]);

  return <></>;
};

export default MultiLine;
