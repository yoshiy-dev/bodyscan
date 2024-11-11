/* eslint-disable tailwindcss/classnames-order */
/* eslint-disable tailwindcss/no-custom-classname */
import { PoseImage } from '@prisma/client';
import Image from 'next/image';
import { useState } from 'react';

type Props = {
  title: string;
  poseImages: PoseImage[] | undefined;
};

export const PoseCarousel: React.FC<Props> = ({ title, poseImages }) => {
  const [isFull, setIsFull] = useState<number>(-1);

  const toggleFull = (i: number) => {
    setIsFull((prev) => (prev !== i ? i : -1));
  };

  return (
    <div>
      <h2 className="text-xl">{title}</h2>
      <div className="mb-1 h-[1px] w-full bg-base-content" />
      <div className="carousel rounded-box space-x-4">
        {poseImages &&
          poseImages.map((poseImage, i) => {
            return (
              <div key={i} className="carousel-item rounded-box">
                <Image
                  src={poseImage.image}
                  height={220}
                  width={160}
                  alt="撮影画像"
                  onClick={() => toggleFull(i)}
                  className={`rounded-box cursor-pointer ${
                    isFull === i ? 'fixed left-0 top-0 z-50 h-full w-full' : ''
                  }`}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};
