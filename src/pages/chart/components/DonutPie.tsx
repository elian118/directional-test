import { Cell, Pie } from 'recharts';
import type { ColoredCoffeeBrandItem, ColoredPopularSnackBrandItem } from '../interfaces/dataTypes.ts';

interface DonutPieProps {
  xKey: string;
  yKey: string;
  selectedData: ColoredCoffeeBrandItem[] | ColoredPopularSnackBrandItem[];
}

export const DonutPie = ({ xKey, yKey, selectedData }: DonutPieProps) => (
  <Pie
    data={selectedData as any}
    nameKey={xKey}
    dataKey={yKey}
    outerRadius="80%"
    innerRadius="60%"
    isAnimationActive={true}
  >
    {selectedData.map((entry, index) => (
      <Cell key={`cell-${index}`} fill={entry.color!} stroke="#1E2939" />
    ))}
  </Pie>
);
