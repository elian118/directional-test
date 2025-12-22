import { Tooltip } from 'recharts';

const StyledTooltip = () => {
  return (
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
  );
};

export default StyledTooltip;
