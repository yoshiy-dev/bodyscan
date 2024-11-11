/* eslint-disable tailwindcss/no-custom-classname */
import { NextPage } from 'next';
import Image from 'next/image';
import { useState } from 'react';

import PageTitle from '@/components/atoms/PageTitle';
import Layout from '@/components/Layout';

const Posenet: NextPage = () => {
  const [isFullRepo, setIsFullRepo] = useState<boolean>(false);
  const toggleFullRepo = () => {
    setIsFullRepo(!isFullRepo);
  };

  return (
    <Layout slug={'/patients/0219613'} IsHeaderNav IsDate>
      <div className="flex h-screen flex-col gap-6 px-8 pt-28">
        {/* <Profile /> */}
        <div>
          <p className="text-xl">2023/5/14</p>
          <PageTitle>施術内容レポート</PageTitle>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <Image
              src={'/images/repo.png'}
              height={600}
              width={400}
              alt="レポート"
              onClick={toggleFullRepo}
              className={`cursor-pointer ${
                isFullRepo ? 'fixed left-0 top-0 z-50 h-full w-full' : ''
              }`}
            />
            <div className="flex flex-col gap-4">
              {/* <PoseCarousel title="施術前" />
              <PoseCarousel title="施術後" /> */}
            </div>
          </div>
        </div>
        <div className="glass-card mb-6 h-full w-full rounded-xl p-5">
          <h3 className="mb-2 text-2xl font-medium">自動生成コメント作成</h3>
          {/* <textarea
            className="textarea-ghost textarea h-[calc(100%-40px)] w-full p-0"
            placeholder="本日の施術では、患者さんの症状に焦点を当て、痛みや不快感の緩和に努めました。施術中に患者さんはリラックスされ、施術後には症状の改善を実感されていました。
            今後の施術プランとして、患者さんの症状やニーズに基づいて、さらなる改善を図るための施術やエクササイズを提案していく予定です。また、姿勢や日常生活の習慣の見直しについてもアドバイスを行い、症状の再発を予防するためのサポートを提供していきます。
            今後もご協力いただきながら、患者さんの健康と快適な生活をサポートしていくことを目指しています。"
          ></textarea> */}
        </div>
      </div>
    </Layout>
  );
};
export default Posenet;
