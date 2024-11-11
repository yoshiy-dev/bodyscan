import { PoseImage, ShootData } from '@prisma/client';
import Image from 'next/image';

import { formatDate } from '@/utils/day';

type ShootDataItemProps = {
  shootData: ShootData & {
    poseImages: PoseImage[];
  };
};
export const ShootDataItem = ({ shootData }: ShootDataItemProps): JSX.Element => {
  return (
    <div className="glass-card rounded-xl border-2 p-5">
      <p className="mb-2 text-2xl font-medium">
        {shootData.shootName || '立位ニュートラル'} {formatDate(shootData.createdAt, 'MM/DD HH:mm')}
      </p>
      <div className="flex gap-4">
        {shootData.poseImages.map((poseImage) => (
          <Image
            key={poseImage.id}
            src={poseImage.image}
            height={200}
            width={140}
            alt={poseImage.poseStatus || ''}
          />
        ))}
      </div>
    </div>
  );
};
