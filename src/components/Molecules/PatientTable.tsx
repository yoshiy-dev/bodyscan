import { PlusIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

import { PatientItem } from '@/components/atoms/PatientItem';
import { Patient } from '@/types';
import { api } from '@/utils/api';

export interface PatientListProps {
  patients: Patient[];
}

export const PatientsList = Array(40).fill({
  id: '219613',
  name: {
    full: 'リベ大 学長',
    initial: 'Ribedai Gakutyou',
  },
  age: 24,
  dob: '1998/06/29',
  sex: '男性',
  height: 180,
  weight: 70,
  BloodType: 'A',
  email: 's.yoshihiro@tech-neighbor.net',
  address: '大阪オフィス',
  postalCode: '573-0157',
  telNumber: '070 9834 3784',
  visitingDate: '2023/05/10',
}) as Patient[];

export const PatientTable = ({
  setPatient,
  IsLink,
}: {
  setPatient?: (patient: string) => void;
  IsLink?: boolean;
}): JSX.Element => {
  const users = api.user.getAll.useQuery();
  const patientsList = users.data || [];

  return (
    <div className="h-full touch-none">
      <ul className="flex touch-none items-center justify-around py-2 text-center text-xl">
        <li className="basis-3/12">氏名</li>
        <li className="basis-1/12">年齢</li>
        <li className="basis-2/12">性別</li>
        <li className="basis-3/12">来院日</li>
        <li className="basis-1/12">撮影</li>
        <li className="basis-2/12">レポート</li>
        <li className="basis-1/12">
          <PlusIcon className="h-8 w-8" />
        </li>
      </ul>
      <div className="flex h-[78vh] touch-pan-y flex-col gap-3 overflow-y-auto">
        {patientsList
          .filter(
            (patient) =>
              patient?.shootData[0]?.createdAt >= new Date('2023/7/16') &&
              patient.shootData.length >= 2,
          )
          .map((patient, index) =>
            // 条件によってLink要素またはbutton要素をレンダリング
            IsLink ? (
              <Link key={index} href={`/patients/${patient.id}`}>
                <PatientItem patient={patient} />
              </Link>
            ) : (
              setPatient && (
                <button key={index} onClick={() => setPatient(patient.id)}>
                  <PatientItem patient={patient} />
                </button>
              )
            ),
          )}
      </div>
    </div>
  );
};
