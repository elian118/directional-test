import { useEffect, useState } from 'react';
import { Bar, BarChart, Cell, Label, PieChart, Tooltip, XAxis, YAxis } from 'recharts';
import { grayColors, tealColors } from '../consts/colors.ts';
import { useDimension } from '../../../common/hooks/useDimention.ts';
import { DonutPie } from './DonutPie.tsx';
import type { ColoredCoffeeBrandItem, ColoredPopularSnackBrandItem } from '../interfaces/dataTypes.ts';
import type { ChartData } from './ChartContainer.tsx';

interface BarAndDonutProps {
  dataSet: ChartData;
}

const BarAndDonut = ({ dataSet }: BarAndDonutProps) => {
  const { title, xKey, yKey, xLabel, yLabel, data } = dataSet;
  const { winWidth } = useDimension();
  const [selectedData, setSelectedData] = useState<ColoredCoffeeBrandItem[] | ColoredPopularSnackBrandItem[]>([]);

  const renderCustomBarLabel = ({ x, y, width, value }: any) => (
    <text x={x + width / 2} y={y} fill="#666" textAnchor="middle" dy={-6}>{`${value}%`}</text>
  );

  useEffect(() => {
    const coloredData: any[] = data?.map((e, idx) => ({
      ...e,
      color: tealColors[tealColors.length - 5 - idx],
    }));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedData(coloredData);
  }, [dataSet]);

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      <div className="w-1/2 p-4">
        <div className="w-full flex items-center justify-center">
          <h2 className="mb-4">{title}</h2>
        </div>
        <BarChart
          width={winWidth * 0.45}
          height={300}
          data={data}
          margin={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <XAxis
            dataKey={xKey}
            label={{
              position: 'insideBottomRight',
              value: xLabel,
              offset: -10,
              dx: -10,
              dy: 5,
            }}
          />
          <YAxis dataKey={yKey} label={{ position: 'insideTopLeft', value: yLabel, angle: -90, dy: 40 }} />
          <Bar dataKey={yKey} fill="#8884d8" label={renderCustomBarLabel}>
            {data.map((_, idx) => (
              <Cell key={`cell-${idx}`} fill={tealColors[(tealColors.length - 5 - idx) % tealColors.length]} />
            ))}
          </Bar>
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderColor: '#333',
              borderRadius: '5px',
            }}
            labelStyle={{
              color: '#0056b3',
              fontWeight: 'bold',
            }}
          />
        </BarChart>
      </div>
      <div className="w-1/2 p-4">
        <PieChart style={{ height: 300, width: winWidth * 0.45 }}>
          <DonutPie xKey={xKey} yKey={yKey} selectedData={selectedData} />
          <Label position="center" fill={grayColors[0]}>
            {title}
          </Label>
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderColor: '#333',
              borderRadius: '5px',
            }}
            labelStyle={{
              color: '#0056b3',
              fontWeight: 'bold',
            }}
            formatter={(e) => `${e}%`}
          />
        </PieChart>
      </div>
    </div>
  );
};

export default BarAndDonut;
