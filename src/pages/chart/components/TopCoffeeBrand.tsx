import { useAsync } from '../../../common/hooks/useAsync.ts';
import { useState } from 'react';
import type { TopCoffeeBrandItem } from '../interfaces/chartTypes.ts';
import { getTopCoffeeBrands } from '../chartApi.ts';
import { Bar, BarChart, Cell, Label, PieChart, Tooltip, XAxis, YAxis } from 'recharts';
import { grayColors, tealColors } from '../colors.ts';
import { useDimension } from '../../../common/hooks/useDimention.ts';
import { DonutPie } from './DonutPie.tsx';

export interface ColoredCoffeeBrandItem extends TopCoffeeBrandItem {
  color: string; // TopCoffeeBrandItem의 모든 속성을 상속받고 color만 추가
}

const TopCoffeeBrand = () => {
  const { winWidth } = useDimension();
  const [data, setData] = useState<ColoredCoffeeBrandItem[]>([]);

  const getData = async () => {
    const res = await getTopCoffeeBrands();
    setData(res.map((e, idx) => ({ ...e, color: tealColors[idx] })));
  };

  const renderCustomBarLabel = ({ x, y, width, value }: any) => {
    return <text x={x + width / 2} y={y} fill="#666" textAnchor="middle" dy={-6}>{`${value}%`}</text>;
  };

  useAsync(async () => {
    await getData();
  }, []);

  return (
    <div className="flex flex-wrap gap-4">
      <div className="w-1/2 p-4">
        <div className="w-full flex items-center justify-center">
          <h2 className="mb-4">Top Coffee Brand</h2>
        </div>
        <BarChart
          width={winWidth * 0.45}
          height={300}
          data={data}
          margin={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <XAxis
            dataKey="brand"
            label={{ position: 'insideBottomRight', value: '커피 브랜드', offset: -10, dx: -10 }}
          />
          <YAxis dataKey="popularity" label={{ position: 'insideTopLeft', value: '인기도', angle: -90, dy: 40 }} />
          <Bar dataKey="popularity" fill="#8884d8" label={renderCustomBarLabel}>
            {data.map((_, idx) => (
              <Cell key={`cell-${idx}`} fill={tealColors[idx % tealColors.length]} />
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
          <DonutPie data={data} />
          <Label position="center" fill={grayColors[0]}>
            Top Coffee Brand
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

export default TopCoffeeBrand;
