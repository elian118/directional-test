import type { ChartData } from './ChartContainer.tsx';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  XAxis,
  YAxis,
} from 'recharts';
import { useDimension } from '../../../common/hooks/useDimention.ts';
import { useEffect, useState } from 'react';
import { indigoColors } from '../consts/colors.ts';
import type {
  ColoredWeeklyMoodItem,
  ColoredWeeklyWorkoutItem,
} from '../interfaces/dataTypes.ts';
import CustomizedLabel from './CustomizedLabel.tsx';
import StyledTooltip from './StyledTooltip.tsx';

interface StackedBarAndAreaProps {
  dataSet: ChartData;
}

const StackedBarAndArea = ({ dataSet }: StackedBarAndAreaProps) => {
  const {
    title,
    xKey,
    yKey,
    yKey2,
    yKey3,
    xLabel,
    yLabel,
    yLabel2,
    yLabel3,
    data,
  } = dataSet;
  const { winWidth, winHeight } = useDimension();
  const [selectedData, setSelectedData] = useState<
    ColoredWeeklyMoodItem[] | ColoredWeeklyWorkoutItem[]
  >([]);

  useEffect(() => {
    const coloredData: any[] = data.map((e, idx) => ({
      ...e,
      color: indigoColors[indigoColors.length - 5 - idx],
    }));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedData(coloredData);
  }, [dataSet]);

  return (
    <div className="flex flex-wrap gap-1 justify-center">
      <div className="w-1/2 p-4">
        <div className="w-full flex items-center justify-center">
          <h2 className="mb-4">{title}</h2>
        </div>
        <BarChart
          style={{
            width: winWidth * 0.45,
            height: winHeight * 0.34,
            maxWidth: '700px',
            maxHeight: '70vh',
            aspectRatio: 1.618,
          }}
          responsive
          data={selectedData}
          margin={{
            top: 20,
            right: 20,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey={xKey}
            label={{
              position: 'insideBottomRight',
              value: xLabel,
              dx: -5,
              dy: 20,
            }}
          />
          <YAxis width="auto" domain={[0, 120]} />
          <StyledTooltip />
          <Legend />
          <Bar
            dataKey={yKey}
            name={yLabel}
            label={<CustomizedLabel label={yLabel} />}
            stackId="a"
            fill="#8884d8"
            background
          />
          <Bar
            dataKey={yKey2}
            name={yLabel2}
            label={<CustomizedLabel label={yLabel2} />}
            stackId="a"
            fill="#82ca9d"
            background
          />
          <Bar
            dataKey={yKey3}
            name={yLabel3}
            label={<CustomizedLabel label={yLabel3} />}
            stackId="a"
            fill="#06B6D4"
            background
          />
        </BarChart>
      </div>
      <div className="w-1/2 p-4">
        <AreaChart
          style={{
            width: winWidth * 0.45,
            height: winHeight * 0.34,
            maxWidth: '700px',
            maxHeight: '70vh',
            aspectRatio: 1.618,
          }}
          responsive
          data={selectedData}
          margin={{
            top: 20,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey={xKey}
            label={{
              position: 'insideBottomRight',
              value: xLabel,
              dx: -5,
              dy: 20,
            }}
          />
          <YAxis width="auto" domain={[0, 120]} />
          <StyledTooltip />
          <Area
            type="monotone"
            name={yLabel}
            label={<CustomizedLabel label={yLabel} />}
            dataKey={yKey}
            stackId="1"
            stroke="#8884d8"
            fill="#8884d8"
          />
          <Area
            type="monotone"
            name={yLabel2}
            label={<CustomizedLabel label={yLabel2} />}
            dataKey={yKey2 as string}
            stackId="1"
            stroke="#82ca9d"
            fill="#82ca9d"
          />
          <Area
            type="monotone"
            name={yLabel3}
            label={<CustomizedLabel label={yLabel3} />}
            dataKey={yKey3 as string}
            stackId="1"
            stroke="#FBBF24"
            fill="#FBBF24"
          />
        </AreaChart>
      </div>
    </div>
  );
};

export default StackedBarAndArea;
