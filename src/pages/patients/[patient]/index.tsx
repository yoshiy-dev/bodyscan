/* eslint-disable tailwindcss/classnames-order */
/* eslint-disable tailwindcss/no-custom-classname */
import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { Item } from '@/components/atoms/Item';
import Layout from '@/components/Layout';
import { Profile } from '@/components/Molecules/Profile';
import { api } from '@/utils/api';

const Patient: NextPage = () => {
  const router = useRouter();
  const id = (router.query.patient as string) || '';
  const { data: user } = api.user.getById.useQuery({ id });
  const { data: patientFiles } = api.patientFile.getByUserId.useQuery({ userId: id });
  return (
    <Layout IsHeaderNav slug="/patients">
      <div className="flex h-full touch-none flex-col gap-6 px-8 pt-28">
        {/*Profileコンポーネントに患者情報を入力*/}
        {user && <Profile Patient={user} />}
        <div className="glass-card h-[35vh] w-full gap-4 rounded-xl p-5">
          <div className="flex h-1/2">
            <div className="basis-2/3">
              <h3 className="font-midium mb-2 text-2xl">症状</h3>
              <textarea
                className="textarea-ghost textarea h-[calc(100%-40px)] w-full touch-none p-0"
                placeholder="肩の痛みと制限された可動域 手首の違和感としびれ"
              />
            </div>
            <Image src={'/images/schema.png'} height={172} width={172} alt="schema" />
          </div>
          <div className="h-1/2 w-full">
            <h3 className="mb-2 text-2xl font-medium">特記事項</h3>
            <textarea
              className="textarea-ghost textarea h-[calc(100%-40px)] w-full touch-none p-0"
              placeholder="数週間前から肩の痛みがあり、肩を動かすと痛みが増すことがあります。肩を上げる動作や回し運動が制限されています。
20歳の時に野球で肩を負傷した経験があり、そのケガの影響で肩の可動域に制限が生じています。
姿勢や仕事の影響：デスクワークや長時間の座り仕事が多いため、腰痛が慢性化しています。また、坐骨神経痛の原因も座位の姿勢と関連している可能性があります。"
            ></textarea>
          </div>
        </div>
        <div className="h-[460px]">
          <h2 className="text-2xl">撮影データ</h2>
          <div className="mb-3 h-[2px] w-full bg-slate-700" />
          <div className="flex h-[440px] touch-pan-y flex-col gap-3 overflow-y-auto">
            {patientFiles &&
              patientFiles.map((patientFile) => (
                <Item key={patientFile.id} patientFile={patientFile} IsLink />
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Patient;
