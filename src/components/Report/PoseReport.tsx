/* eslint-disable @next/next/no-img-element */
/* eslint-disable import/order */
/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable tailwindcss/classnames-order */
import Image from 'next/image';

import { RadarChartComponent } from '@/components/Report/RadarChart';
import { PoseTable } from '@/components/Report/PoseTable';
import { PoseImage } from '@prisma/client';
import { getText } from '@/components/Report/socre';

export type PoseReportProps = {
  beforePoseImages?: PoseImage[];
  afterPoseImages?: PoseImage[];
  chartData: { subject: string; A: number; B: number; max: number }[];
  score: { A: number; B: number };
};

export const PoseReport = ({
  beforePoseImages,
  afterPoseImages,
  chartData,
  score,
}: PoseReportProps): JSX.Element => {
  return (
    <div
      id="pose-report"
      className="h-[480px] w-[340px] bg-gradient-to-br from-primary to-base-100 p-2"
    >
      {/* <Image
        src={'/images/report/report4.png'}
        alt="レポート背景"
        width={340}
        height={480}
        className="absolute left-0 top-0 z-0"
      /> */}
      <header className="mb-2 w-2/3 rounded-lg border-2 border-secondary bg-gradient-to-br from-primary-focus to-secondary-focus">
        {/* <img src={'/images/report/骨盤.png'} alt="ロゴ" width={24} height={24} /> */}
        <h1 className="-mt-2 mb-3 px-2 text-xl font-semibold text-slate-50">姿勢分析レポート</h1>
      </header>
      {/* スコア */}
      <main className="z-10 -mt-2">
        <h2 className="mb-2 w-1/4 font-semibold">分析結果</h2>
        <span className="mb-2 block h-[2px] w-1/4 bg-secondary" />
        <div className="flex gap-2">
          {/* スコア */}
          <div className="flex w-1/2 flex-col gap-2">
            <div>
              <div className="mb-1 flex">
                <span className="mr-1 mt-[6px] block h-4 w-[2px] bg-secondary" />
                <h3 className="text-xs font-semibold">総合評価</h3>
              </div>
              <PoseTable Score={score} />
            </div>
            {/* チャート分析 */}
            <div className="relative">
              <div className="mb-3 flex">
                <span className="mr-1 mt-[6px] block h-4 w-[2px] bg-secondary" />
                <h3 className="text-xs font-semibold">部位の評価</h3>
              </div>
              <div className="absolute top-5">
                <RadarChartComponent chartData={chartData} />
              </div>
            </div>
          </div>
          {/* 画像 */}
          <div className="w-1/2 text-[2px]">
            <div className="flex">
              <span className="mr-1 mt-[6px] block h-4 w-[2px] bg-secondary" />
              <h3 className="text-xs font-semibold">姿勢分析</h3>
            </div>
            <p className="-mt-1 mb-1">施術前</p>
            <div className="grid grid-cols-2 gap-1">
              <div className="relative h-[114px] w-[76px]">
                <Image
                  src={
                    beforePoseImages ? beforePoseImages[0].image : '/images/sample/frontpose.png'
                  }
                  fill
                  // height={100}
                  // width={80}
                  alt="撮影画像"
                />
              </div>
              <div className="relative h-[114px] w-[76px]">
                <Image
                  src={
                    beforePoseImages ? beforePoseImages[1].image : '/images/sample/frontpose.png'
                  }
                  fill
                  alt="撮影画像"
                />
              </div>
            </div>
            <p className="-mt-1 mb-1">施術後</p>
            <div className="grid grid-cols-2 gap-1">
              <div className="relative h-[114px] w-[76px]">
                <Image
                  src={afterPoseImages ? afterPoseImages[0].image : '/images/sample/frontpose.png'}
                  fill
                  alt="撮影画像"
                />
              </div>
              <div className="relative h-[114px] w-[76px]">
                <Image
                  src={afterPoseImages ? afterPoseImages[1].image : '/images/sample/sidepose.png'}
                  fill
                  alt="撮影画像"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="z-10 mt-2 flex flex-1">
        <div className="relative z-10 h-[100px] w-full rounded-lg bg-white p-2 text-[2px] shadow-md">
          {/* <div className="absolute -right-2 top-3  -z-10 h-6 w-6 rotate-45 bg-white" /> */}
          <p className="absolute top-0 pb-3">{getText(score.B)}</p>
        </div>
        <Image
          className="z-20"
          src={'/images/report/レオタード学長.svg'}
          alt="学長"
          width={100}
          height={300}
        />
      </footer>
      {/* <p className="text-[2px] text-slate-400">
        *免責事項:
        AIによる姿勢分析は純粋に画像処理に基づいて行われ、診断や保証を提供するものではない
      </p> */}
    </div>
  );
};
