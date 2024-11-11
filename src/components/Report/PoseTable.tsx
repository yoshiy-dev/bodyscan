import { getRankAndColor } from '@/components/Report/socre';

type Props = { Score: { A: number; B: number } };

// type Rank = [
//   RankLevel:{'E' | 'D' | 'C' | 'B' | 'A' | 'S' | '測定不能'};
//   text:{};
// ;]

// const calculateRank = (score: number): Rank => {
//   if (score < 20) return 'E';
//   else if (score < 40) return 'D';
//   else if (score < 60) return 'C';
//   else if (score < 80) return 'B';
//   else if (score < 95) return 'A';
//   else if (score >= 95) return 'S';
//   else return '測定不能';
// };

export const PoseTable = ({ Score: { A, B } }: Props): JSX.Element => {
  return (
    <table className="-mt-2 w-full text-center">
      <thead>
        <tr>
          <th colSpan={2} className="text-sm">
            <p className="mb-[6px]">総合評価</p>
            <span className="block h-[2px] w-full bg-gray-400" />
          </th>
        </tr>
      </thead>
      <tbody className="text-sm">
        <tr>
          <td className="">施術前</td>
          <td className="">施術後</td>
        </tr>
        <tr>
          <td>{A}/100</td>
          <td>{B}/100</td>
        </tr>
        <tr className="text-xl font-semibold">
          <td className={getRankAndColor(A).textColor}>{getRankAndColor(A).rank}</td>
          <td className={getRankAndColor(B).textColor}>{getRankAndColor(B).rank}</td>
        </tr>
      </tbody>
    </table>
  );
};
