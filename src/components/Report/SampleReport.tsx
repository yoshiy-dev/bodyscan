/* eslint-disable import/order */
/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable tailwindcss/classnames-order */
import Image from 'next/image';

import { RadarChartComponent } from '@/components/Report/RadarChart';
import { PoseReportProps } from '@/components/Report/PoseReport';
import { PoseTable } from '@/components/Report/PoseTable';

export const SampleReport = ({
  beforePoseImages,
  afterPoseImages,
  chartData,
  score,
}: PoseReportProps): JSX.Element => {
  return (
    <div className="relative flex h-[480px] w-[340px] flex-col gap-2 bg-gradient-to-br from-primary to-base-100 p-2">
      {/* <Image
        src={'/images/report/report4.png'}
        alt="レポート背景"
        width={340}
        height={480}
        className="absolute left-0 top-0 z-0"
      /> */}
      <header className="z-10 flex w-2/3 items-center gap-2 rounded-lg border-2 border-secondary bg-gradient-to-br from-primary-focus to-secondary-focus p-2 text-xl">
        {/* <div className="flex items-center justify-center">
          <Image src={'/images/report/骨盤.png'} alt="ロゴ" width={24} height={24} />
        </div> */}
        <h1 className="text-xl font-semibold text-slate-50">姿勢分析レポート</h1>
      </header>
      {/* スコア */}
      <main className="z-10">
        <h2 className="mb-3 w-1/4 border-b-[2px] border-secondary font-semibold">分析結果</h2>
        <div className="flex gap-2">
          {/* スコア */}
          <div className="flex w-1/2 flex-col gap-2">
            <h2 className="mb-1 border-l-2 border-secondary pl-1 text-xs font-semibold">
              総合評価
            </h2>
            <PoseTable Score={score} />
            {/* チャート分析 */}
            <div>
              <h3 className="mb-2 border-l-2 border-secondary pl-1 text-xs font-semibold">
                部位の評価
              </h3>
              <RadarChartComponent chartData={chartData} />
            </div>
          </div>
          {/* 画像 */}
          <div className="w-1/2 text-[2px]">
            <h2 className="mb-1 border-l-2 border-secondary pl-1 text-xs font-semibold">
              姿勢分析
            </h2>
            <div className="w-1/2 text-[2px]">
              <p>施術前</p>
              <div className="grid grid-cols-2 gap-1">
                <div className="relative h-[114px] w-[76px]">
                  <Image
                    src={
                      beforePoseImages ? beforePoseImages[0].image : '/images/sample/frontpose.png'
                    }
                    fill
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
              <p>施術後</p>
              <div className="grid grid-cols-2 gap-1">
                <div className="relative h-[114px] w-[76px]">
                  <Image
                    src={
                      afterPoseImages ? afterPoseImages[0].image : '/images/sample/frontpose.png'
                    }
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
        </div>
      </main>
      <footer className="z-10 flex flex-1">
        <div className="relative z-10 w-full rounded-lg bg-white p-2 text-[2px] shadow-md">
          <div className="absolute -right-2 top-3  -z-10 h-6 w-6 rotate-45 bg-white" />
          <p>
            テキスト内容テキスト内容テキスト内容テキスト内容テキスト内容テキスト内容テキスト内容テキスト内容テキスト内容
          </p>
        </div>
        <Image src={'/images/report/レオタード学長.svg'} alt="学長" width={100} height={300} />
      </footer>
      {/* <p className="text-[2px] text-slate-400">
        *免責事項:
        AIによる姿勢分析は純粋に画像処理に基づいて行われ、診断や保証を提供するものではない
      </p> */}
    </div>
  );
};
