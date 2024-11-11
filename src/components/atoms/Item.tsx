import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { PatientFile } from '@prisma/client';
import Link from 'next/link';
import React from 'react';

import { formatDate } from '@/utils/day';

//アイテムで共通化してが画像データも共有
interface ItemProps {
  patientFile?: PatientFile;
  IsLink?: boolean;
}

export const Item: React.FC<ItemProps> = ({ patientFile, IsLink }) => {
  return (
    <>
      {patientFile && IsLink ? (
        <Link href={`/patients/${patientFile.userId}/posenet?id=${patientFile.id}`}>
          <div
            role="button"
            className="glass-card h-[60px] items-center rounded-2xl duration-300 hover:bg-white"
          >
            <ul className="flex h-[60px] items-center justify-between px-8 text-xl">
              <li>{patientFile.shootName || '立位ニュートララル'}</li>
              <li>{formatDate(patientFile.createdAt, 'YYYY/MM/DD')}</li>
              <ChevronRightIcon className="h-8 w-8" />
            </ul>
          </div>
        </Link>
      ) : (
        <div
          role="button"
          className="glass-card h-[60px] items-center rounded-2xl duration-300 hover:bg-white"
        >
          <ul className="flex h-[60px] items-center justify-between px-8 text-xl">
            <li>{'立位ニュートララル'}</li>
            <ChevronRightIcon className="h-8 w-8" />
          </ul>
        </div>
      )}
    </>
  );
};
