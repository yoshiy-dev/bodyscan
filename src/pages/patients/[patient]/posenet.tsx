/* eslint-disable tailwindcss/no-custom-classname */
import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';

import PageTitle from '@/components/atoms/PageTitle';
import Layout from '@/components/Layout';
import { PoseCarousel } from '@/components/Molecules/PoseCarousel';
import { Profile } from '@/components/Molecules/Profile';
import { api } from '@/utils/api';

const Posenet: NextPage = (props) => {
  const [isFullRepo, setIsFullRepo] = useState<boolean>(false);
  const toggleFullRepo = () => setIsFullRepo(!isFullRepo);
  const router = useRouter();
  const userId = (router.query.patient as string) || '';
  const id = Number(router.query.id);
  const { data: user } = api.user.getById.useQuery({ id: userId });
  const { data: patientFile } = api.patientFile.getById.useQuery({ id });
  // const { data: patientFile } = api.patientFile.getLatestByUserId.useQuery({ userId });

  const patientFileShootDatas = patientFile?.patientFileShootDatas || [];
  const width = 360;
  const height = 480;

  return (
    <Layout slug={`/patients/${userId}`} IsHeaderNav IsDate>
      <div className="bg-primary mb-20  flex flex-col gap-6 px-8 pt-28">
        {user && <Profile Patient={user} />}
        <div>
          <p className="text-xl">2023/5/14</p>
          <PageTitle>施術内容レポート</PageTitle>
          <span className="bg-primary-focus mb-2 block h-[3px] w-1/3" />
          {patientFileShootDatas.length && patientFileShootDatas[0].shootData && (
            <div className="grid grid-cols-2">
              <div>
                <p>施術前</p>
                <Image
                  src={patientFileShootDatas[0].shootData.poseImages[0].image}
                  width={width}
                  height={height}
                  alt=""
                />
              </div>
              <div>
                <p>施術後</p>
                <Image
                  src={patientFileShootDatas[1].shootData.poseImages[0].image}
                  width={width}
                  height={height}
                  alt=""
                />
              </div>
              <div>
                <p>施術前</p>
                <Image
                  src={patientFileShootDatas[0].shootData.poseImages[1].image}
                  width={width}
                  height={height}
                  alt=""
                />
              </div>
              <div>
                <p>施術後</p>
                <Image
                  src={patientFileShootDatas[1].shootData.poseImages[1].image}
                  width={width}
                  height={height}
                  alt=""
                />
              </div>
            </div>
          )}
          <div className="mt-4 grid grid-cols-2 gap-4">
            <Image
              src={patientFile?.reportImage ? patientFile.reportImage : '/images/repo.png'}
              height={522}
              width={370}
              alt="レポート"
              onClick={toggleFullRepo}
              className={`cursor-pointer ${
                isFullRepo ? 'fixed left-0 top-0 z-50 h-full w-full' : ''
              }`}
            />
            <div className="flex flex-col gap-4">
              {patientFileShootDatas.map(({ shootData }, i) => {
                const poseImages = shootData.poseImages;

                return (
                  <PoseCarousel
                    key={i}
                    title={i !== 1 ? '施術前' : '施術後'}
                    poseImages={poseImages}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* <div className="glass-card mb-6 h-full w-full rounded-xl p-5">
          <h3 className="mb-2 text-2xl font-medium">施術内容・コメント</h3>
          <textarea
            className="textarea-ghost textarea h-[calc(100%-40px)] w-full touch-none p-0"
            placeholder="本日の施術では、患者さんの症状に焦点を当て、痛みや不快感の緩和に努めました。施術中に患者さんはリラックスされ、施術後には症状の改善を実感されていました。
            今後の施術プランとして、患者さんの症状やニーズに基づいて、さらなる改善を図るための施術やエクササイズを提案していく予定です。また、姿勢や日常生活の習慣の見直しについてもアドバイスを行い、症状の再発を予防するためのサポートを提供していきます。
            今後もご協力いただきながら、患者さんの健康と快適な生活をサポートしていくことを目指しています。"
          ></textarea>
        </div> */}
      </div>
    </Layout>
  );
};
export default Posenet;
