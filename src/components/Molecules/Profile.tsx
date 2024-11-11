import { User } from '@prisma/client';
import Image from 'next/image';

import PageTitle from '@/components/atoms/PageTitle';
import { formatDate } from '@/utils/day';

export const Profile: React.FC<{ Patient: User }> = ({ Patient }) => {
  const {
    patientNumber,
    name,
    lineName,
    age,
    sex,
    barthDate,
    blood,
    phoneNumber,
    address,
    zipCode,
    image,
  } = Patient;
  return (
    <div className="flex gap-6">
      <div>
        <Image
          src={image || '/images/noimage.webp'}
          height={112}
          width={112}
          alt=""
          className="rounded-full"
        />
      </div>
      {/* 画像ない人用のアイコン（条件分岐で表示） */}
      {/* <UserCircleIcon className="h-28 w-28" /> */}
      <div className="flex flex-col justify-end">
        <p className="inline-block">
          患者No. {patientNumber}
          <br />
          {lineName && `Line: ${lineName}`}
        </p>
        <PageTitle>{name}</PageTitle>
        <span>
          {age}歳 &nbsp;
          {sex && (sex == 'FEMALE' ? '女性' : '男性')}&nbsp;
          {blood && `${blood}型`}
        </span>
      </div>
      <div className="flex flex-col">
        <div className="flex-1" />
        <p className="block">
          生年月日：{barthDate ? formatDate(barthDate, 'YYYY/MM/DD') : ''}
          <br />
          TEL:{phoneNumber}
          <br />〒{zipCode}
          <br />
          住所:{address}
        </p>
      </div>
    </div>
  );
};
