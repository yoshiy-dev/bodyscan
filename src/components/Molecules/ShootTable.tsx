import { PlusIcon } from '@heroicons/react/24/solid';
import { PatientFile } from '@prisma/client';
import Link from 'next/link';

import { Item } from '@/components/atoms/Item';

export const ShootTable = ({
  setShoot,
  patient,
}: {
  setShoot: (shoot: string) => void;
  patient?: string;
}): JSX.Element => {
  return (
    <div>
      {/* head */}
      <ul className="flex w-full justify-between p-8 py-4 text-xl">
        <li>撮影方法</li>
        <li>
          <PlusIcon className="h-8 w-8" />
        </li>
      </ul>
      <div className="flex h-[35vh] flex-col gap-3 overflow-y-auto">
        {patientFiles.map((patientFile, index) => (
          <button key={index} onClick={() => setShoot(patientFile.shootName || '')}>
            <Link
              href={{
                pathname: '/camera',
                query: { userId: patient, shoot: patientFile.shootName },
              }}
            >
              <Item patientFile={patientFile} />
            </Link>
          </button>
        ))}
      </div>
    </div>
  );
};

export const patientFiles: PatientFile[] = [
  {
    id: 1,
    reportImage: null,
    reportTitle: null,
    reportComment: null,
    shootName: '立位ニュートララル',
    comment: null,
    userId: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 1,
    reportImage: null,
    reportTitle: null,
    reportComment: null,
    shootName: '立位ニュートララル',
    comment: null,
    userId: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 1,
    reportImage: null,
    reportTitle: null,
    reportComment: null,
    shootName: '立位ニュートララル',
    comment: null,
    userId: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
