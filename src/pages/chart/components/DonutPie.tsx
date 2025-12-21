import { Cell, Pie } from 'recharts';
import type { ColoredCoffeeBrandItem } from './TopCoffeeBrand.tsx';

interface DonutPieProps {
  data: ColoredCoffeeBrandItem[];
}

export const DonutPie = ({ data }: DonutPieProps) => (
  <Pie
    data={data as any}
    dataKey="popularity"
    nameKey="brand"
    outerRadius="80%"
    innerRadius="60%"
    isAnimationActive={false}
  >
    {data.map((entry, index) => (
      <Cell key={`cell-${index}`} fill={entry.color!} />
    ))}
  </Pie>
);
