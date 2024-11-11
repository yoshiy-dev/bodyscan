/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable tailwindcss/classnames-order */
import { Legend, PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts';

export const RadarChartComponent = ({
  chartData,
}: {
  chartData: { subject: string; A: number; B: number; max: number }[];
}): JSX.Element => {
  return (
    <RadarChart outerRadius={50} width={150} height={135} data={chartData}>
      <PolarGrid />
      <PolarAngleAxis dataKey="subject" tick={{ fontSize: 8 }} />
      <Radar name="施術前" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
      <Radar name="施術後" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
      {/* <Radar name="max" dataKey="max" stroke="" fill="" fillOpacity={0} /> */}
      <Legend
        layout="horizontal"
        align="center"
        verticalAlign="bottom"
        wrapperStyle={{ lineHeight: '5px', fontSize: '1px' }}
      />
    </RadarChart>
  );
};

// 全身の傾き
// 上半身の傾き
// 下半身の傾き
// 肩の高さのズレ
// 腰の左右の傾き
// const data = [
//   { subject: '全身', A: 1, B: 0.8, max: 5 },
//   { subject: '肩', A: 3, B: 2.5, max: 5 },
//   { subject: '腰', A: 3, B: 2.2, max: 5 },
//   { subject: '脚', A: 2, B: 1.8, max: 5 },
//   { subject: '側面', A: 3, B: 3.5, max: 5 },
// ];
