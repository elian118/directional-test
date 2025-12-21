const CustomizedLabel = ({ x, y, stroke, value, label }: any) => {
  return (
    <text x={x} y={y} dx={38} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">
      {label}: {value}
    </text>
  );
};

export default CustomizedLabel;
