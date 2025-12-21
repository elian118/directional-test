import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface TeamChartProps {
  teamData: any; // 팀의 series 데이터 (컵, 생산성, 버그) 배열
  teamName: string;
  metricKeys: { key: string; name: string; color: string }[];
}

const TeamMultiLineChart = ({ teamData, teamName, metricKeys }: TeamChartProps) => {
  return (
    <div className="mb-8 p-4 border rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4 text-center">{teamName} 팀의 커피/생산성/버그 추이</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={teamData} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />

          {/* X축: 데이터 포인트 (index 또는 임의의 시간 축) */}
          <XAxis dataKey="index" label={{ value: '측정 시점', position: 'bottom' }} />

          {/* Y축 (좌측): 생산성 (Productivity) */}
          <YAxis
            yAxisId="productivity"
            label={{ value: '생산성 (%)', angle: -90, position: 'left' }}
            stroke="#8884d8"
          />

          {/* Y축 (우측-1): 컵 수 (Cups) */}
          <YAxis
            yAxisId="cups"
            orientation="right"
            label={{ value: '커피 컵 수', angle: 90, position: 'right' }}
            stroke="#82ca9d"
          />

          {/* Y축 (우측-2): 버그 수 (Bugs) */}
          <YAxis
            yAxisId="bugs"
            orientation="right"
            label={{ value: '버그 수', angle: -90, position: 'right' }}
            stroke="#ffc658"
            style={{ transform: 'translate(40px, 0)' }}
          />

          <Tooltip />
          <Legend />

          {metricKeys.map(({ key, name, color }) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              name={name}
              stroke={color}
              // 메트릭에 따라 다른 Y축 ID를 할당합니다.
              yAxisId={key}
              activeDot={{ r: 8 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TeamMultiLineChart;
