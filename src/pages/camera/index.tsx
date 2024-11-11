import { XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import React from 'react';
import Webcam from 'react-webcam';

import { PoseIcon } from '@/components/atoms/PoseIcon';
import { FooterNav } from '@/components/Organisms/FooterNav';
import useCamera from '@/hooks/useCamera';

const Camera: React.FC = () => {
  const { image, removeImage, selectPoseNumber, webcamRef, capture, canvasRef, runPosenet } =
    useCamera();
  const [PoseCamera, setPoseCamera] = useState<JSX.Element>();
  const [PoseImage, setPoseImage] = useState<JSX.Element>();

  useEffect(() => {
    setPoseCamera(
      <>
        <Webcam
          ref={webcamRef}
          audio={false}
          videoConstraints={{ facingMode: 'environment' }}
          // videoConstraints={{ width: 2360, height: 1640 }}
          screenshotFormat="image/jpeg"
          className="absolute inset-x-0 z-10 mx-auto w-full touch-none object-contain text-center"
        />
        <canvas
          ref={canvasRef}
          className="absolute inset-x-0 z-10 mx-auto w-full touch-none object-contain text-center"
        />
      </>,
    );
    void runPosenet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!image) return;
    setPoseImage(
      <>
        <div
          className="absolute left-10 top-5 z-20 touch-none text-6xl"
          onClick={handleDeleteImage}
        >
          <XMarkIcon className="h-14 w-14" />
        </div>
        <Image
          src={image}
          width={2360}
          height={1640}
          alt="Picture of the author"
          className="absolute inset-x-0 z-10 mx-auto w-full touch-none object-contain text-center"
        />
        <canvas
          ref={canvasRef}
          className="absolute inset-x-0 z-10 mx-auto w-full touch-none object-contain text-center"
        />
      </>,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);

  const handleDeleteImage = () => {
    removeImage();
  };

  return (
    <main className="h-full w-full">
      <div className="fixed right-10 z-10 flex h-screen touch-none flex-col justify-center gap-8">
        <PoseIcon variant="front" onClick={() => selectPoseNumber(0)} />
        <PoseIcon variant="left" onClick={() => selectPoseNumber(1)} />
        <PoseIcon variant="right" onClick={() => selectPoseNumber(2)} />
        <PoseIcon variant="back" onClick={() => selectPoseNumber(3)} />
      </div>
      <div className="fixed w-full">{image ? PoseImage : PoseCamera}</div>
      <FooterNav IsShutter capture={capture} IsImage={!!image} />
    </main>
  );
};

export default Camera;
