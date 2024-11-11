import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { PatientFile, ShootData, User } from '@prisma/client';
import { useRouter } from 'next/router';
import React from 'react';

import { formatDate } from '@/utils/day';

interface PatientItemProps {
  patient: User & {
    shootData: ShootData[];
    patientFiles: PatientFile[];
  };
}

export const PatientItem: React.FC<PatientItemProps> = ({ patient }) => {
  const router = useRouter();
  const { id, name, age, sex } = patient;
  const date = patient.shootData[patient.shootData.length - 1]?.createdAt;
  const handleClick = () => {
    () => router.push(id);
  };
  return (
    <div
      role="button"
      onClick={handleClick}
      className="glass-card h-[60px] touch-pan-y rounded-2xl duration-300 hover:bg-white"
    >
      <ul className="flex h-[60px] items-center text-center text-xl">
        <li className="basis-3/12">{name}</li>
        <li className="basis-1/12">{age}</li>
        <li className="basis-2/12">{sex == 'MALE' ? '男性' : '女性'}</li>
        {/* <li>{visitingDate ? formatDate(visitingDate as Date, 'YYYY/MM/DD') : ''}</li> */}
        <li className="basis-3/12">
          {date instanceof Date ? formatDate(date, 'YYYY/MM/DD') : '撮影データなし'}
        </li>
        <li className="basis-1/12">{patient.shootData.length} 件</li>
        <li className="basis-2/12">{patient.patientFiles.length} 件</li>
        <li className="basis-1/12">
          <ChevronRightIcon className="h-8 w-8" />
        </li>
      </ul>
    </div>
  );
};
