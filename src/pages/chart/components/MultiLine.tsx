import { useEffect, useState } from 'react';
import type { Team } from '../interfaces/teamTypes.ts';
import type { SnackImpactDepartment } from '../interfaces/departmentTypes.ts';
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from 'recharts';

interface MultiLineProps {
  dataSet: any;
}

const MultiLine = ({ dataSet }: MultiLineProps) => {
  const { title, xKey, yKey, yKey2, xLabel, yLabel, yLabel2, data } = dataSet;
  const [departs, setDeparts] = useState<Team[] | SnackImpactDepartment[]>([]);

  useEffect(() => {
    setDeparts(data);
  }, [dataSet]);

  const getDepartData = (depart: Team | SnackImpactDepartment) =>
    'team' in depart ? depart.team : depart.name;

  const getSeriesData = (depart: Team | SnackImpactDepartment) =>
    'team' in depart ? depart.series : depart.metrics;

  const getDepartName = (depart: Team | SnackImpactDepartment) =>
    'team' in depart ? depart.team : depart.name;

  const departColors = ['#0EA5E9', '#F06565', '#FBBF24'];

  const legendFormatter = (value: any) => {
    return (
      <span style={{ color: '#F9F9F9', fontWeight: 'bold' }}>{value}</span>
    );
  };

  return (
    <div className="mt-4 flex flex-col justify-between items-center">
      <div className="w-full flex items-center justify-center">
        <h2 className="mb-4">{title}</h2>
      </div>
      <div className="w-full flex items-center justify-center mx-auto relative">
        {departs.length > 0 &&
          departs.map((depart, idx) => (
            <div
              key={`depart-${getDepartData(depart)}`}
              className="w-full md:w-3/4 xl:w-9/12 px-24 mx-auto absolute top-0"
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
                  right: idx === 0 ? xKey === 'cups' ? 10 : 1 : 62,
                  left: idx === 0 ? xKey === 'cups' ? 10 : 27 : 71,
                  bottom: idx === 0 ? 17 : 71,
                }}
              >
                {idx === 0 && <CartesianGrid strokeDasharray="3 3" />}
                <XAxis
                  dataKey={xKey}
                  label={{
                    position: 'insideBottomRight',
                    value: xLabel,
                    dx: 5,
                    dy: 20,
                  }}
                  hide={idx !== 0}
                />
                <YAxis
                  yAxisId="leftId"
                  name={yLabel}
                  label={{
                    position: 'top',
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
                  hide={idx !== 0}
                />
                <YAxis
                  yAxisId="rightId"
                  name={yLabel2}
                  label={{
                    position: 'top',
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
                  hide={idx !== 0}
                />
                {idx === 0 && <Legend formatter={legendFormatter} />}
                <Line
                  type="monotone"
                  dataKey={yKey}
                  stroke={departColors[idx]}
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey={yKey2}
                  stroke={departColors[idx]}
                  strokeDasharray="5 5"
                />
              </LineChart>

              <div className="mt-2 w-full flex justify-center items-center gap-10">
                <h2
                  className={`${idx !== 0 ? 'invisible' : ''}`}
                  style={{ color: departColors[idx] }}
                >
                  {getDepartName(depart)}
                </h2>
                <h2
                  className={`${idx !== 1 ? 'invisible' : ''}`}
                  style={{ color: departColors[idx] }}
                >
                  {getDepartName(depart)}
                </h2>
                <h2
                  className={`${idx !== 2 ? 'invisible' : ''}`}
                  style={{ color: departColors[idx] }}
                >
                  {getDepartName(depart)}
                </h2>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MultiLine;
