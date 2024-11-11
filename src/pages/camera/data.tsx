/* eslint-disable tailwindcss/no-custom-classname */
import { Vector2D } from '@tensorflow-models/posenet/dist/types';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';

import { AngleCard } from '@/components/atoms/AngleCard';
import { PoseIcon } from '@/components/atoms/PoseIcon';
import Layout from '@/components/Layout';
import { FooterNav } from '@/components/Organisms/FooterNav';
import { drawImageResult, ImagePose } from '@/hooks/useCamera';
import useSessionStorage from '@/hooks/useSessionStorage';
import { KeypointsObj } from '@/types';
import { imageNumberAtom } from '@/utils/Atom';
import { calcAngle, calcRelativeDistance, calcRelativeDistances } from '@/utils/calcScore';

const Data: React.FC = () => {
  const router = useRouter();
  const query = router.asPath.split('?')[1];

  const [image1] = useSessionStorage('image1', '');
  const [image2] = useSessionStorage('image2', '');
  const [image3] = useSessionStorage('image3', '');
  const [image4] = useSessionStorage('image4', '');
  const [ImageRefs, setImageRefs] = useState<(HTMLCanvasElement | null)[]>();

  const [pose1] = useSessionStorage<ImagePose>('pose1', {});
  const [pose2] = useSessionStorage<ImagePose>('pose2', {});
  const [pose3] = useSessionStorage<ImagePose>('pose3', {});
  const [pose4] = useSessionStorage<ImagePose>('pose4', {});
  const canvasRef1 = useRef<HTMLCanvasElement>(null);
  const canvasRef2 = useRef<HTMLCanvasElement>(null);
  const canvasRef3 = useRef<HTMLCanvasElement>(null);
  const canvasRef4 = useRef<HTMLCanvasElement>(null);

  const [ImagesElement, setImagesElement] = useState<JSX.Element>();

  const [imNum, setImNum] = useRecoilState(imageNumberAtom);
  const [scores, setScores] = useState({
    front: { shoulderAngle: 0, wristAngle: 0, leftLeg: 0, rightLeg: 0 },
    side: [0, 0, 0, 0],
  });

  useEffect(() => {
    const poses = { pose1, pose2, pose3, pose4 };
    const pose = poses[`pose${imNum + 1}` as keyof typeof poses];
    calcAngles(pose);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imNum]);

  const calcAngles = (pose: ImagePose) => {
    if (!pose.pose?.keypoints) return;
    const keypointObj = pose.pose.keypoints.reduce((keypointObj, { part, position }) => {
      return { ...keypointObj, [part]: position };
    }, {}) as KeypointsObj;

    if (imNum === 0 || imNum === 3) {
      const shoulderAngle = calcAngle(
        keypointObj.leftShoulder as Vector2D,
        keypointObj.rightShoulder as Vector2D,
      );

      const wristAngle = calcAngle(
        keypointObj.leftWrist as Vector2D,
        keypointObj.rightWrist as Vector2D,
      );
      const leftLeg = calcRelativeDistance(
        keypointObj.leftHip as Vector2D,
        keypointObj.leftKnee as Vector2D,
        keypointObj.leftAnkle as Vector2D,
      );

      const rightLeg = calcRelativeDistance(
        keypointObj.rightHip as Vector2D,
        keypointObj.rightKnee as Vector2D,
        keypointObj.rightAnkle as Vector2D,
      );
      setScores((prev) => ({ ...prev, front: { shoulderAngle, wristAngle, leftLeg, rightLeg } }));
    } else if (imNum === 1) {
      const leftNums = calcRelativeDistances([
        keypointObj.leftAnkle as Vector2D,
        keypointObj.leftKnee as Vector2D,
        keypointObj.leftWrist as Vector2D,
        keypointObj.leftShoulder as Vector2D,
        keypointObj.leftEar as Vector2D,
      ]);
      setScores((prev) => ({ ...prev, side: leftNums }));
    } else if (imNum === 2) {
      const rightNums = calcRelativeDistances([
        keypointObj.rightAnkle as Vector2D,
        keypointObj.rightKnee as Vector2D,
        keypointObj.rightWrist as Vector2D,
        keypointObj.rightShoulder as Vector2D,
        keypointObj.rightEar as Vector2D,
      ]);
      setScores((prev) => ({ ...prev, side: rightNums }));
    }
  };

  useEffect(() => {
    setImagesElement(
      <>
        {image1 && (
          <div id="image1" className="carousel-item w-full">
            <canvas ref={canvasRef1} className="w-full object-contain" />
          </div>
        )}
        {image2 && (
          <div id="image2" className="carousel-item w-full">
            <canvas ref={canvasRef2} className="w-full object-contain" />
          </div>
        )}
        {image3 && (
          <div id="image3" className="carousel-item w-full">
            <canvas ref={canvasRef3} className="w-full object-contain" />
          </div>
        )}
        {image4 && (
          <div id="image4" className="carousel-item w-full">
            <canvas ref={canvasRef4} className="w-full object-contain" />
          </div>
        )}
      </>,
    );
    setTimeout(() => {
      drawImageResult(image1, pose1, canvasRef1, { poseStatus: 'front' });
      drawImageResult(image2, pose2, canvasRef2, { poseStatus: 'left' });
      drawImageResult(image3, pose3, canvasRef3, { poseStatus: 'right' });
      drawImageResult(image4, pose4, canvasRef4, { poseStatus: 'back' });

      setImageRefs([
        canvasRef1.current,
        canvasRef2.current,
        canvasRef3.current,
        canvasRef4.current,
      ]);
    }, 100); // 0.1秒待機
  }, [image1, image2, image3, image4, pose1, pose2, pose3, pose4]);

  return (
    <Layout IsHeaderNav slug={`/camera?${query}`} IsMenu IsDate>
      <div className="relative">
        <div className="absolute left-8 top-28 z-20 flex touch-none flex-col justify-center gap-4">
          {imNum == 0 || imNum == 3 ? (
            <>
              <AngleCard score={`${scores.front.shoulderAngle}°`}>肩の角度</AngleCard>
              <AngleCard score={`${scores.front.wristAngle}°`}>腰の角度</AngleCard>
              <AngleCard score={`${scores.front.rightLeg}`}>右脚の曲率</AngleCard>
              <AngleCard score={`${scores.front.rightLeg}`}>左脚の曲率</AngleCard>
            </>
          ) : (
            <>
              <AngleCard score={`${scores.side[0]}`}>首の誤差</AngleCard>
              <AngleCard score={`${scores.side[1]}`}>肩の誤差</AngleCard>
              <AngleCard score={`${scores.side[2]}`}>腰の誤差</AngleCard>
              <AngleCard score={`${scores.side[3]}`}>膝の誤差</AngleCard>
            </>
          )}
        </div>
        <div className="carousel rounded-box fixed top-0 w-full touch-none">{ImagesElement}</div>
        <div className="fixed right-8 top-[calc(50%-272px)] z-20 flex flex-col justify-center gap-8">
          <PoseIcon variant="front" id="#image1" onClick={() => setImNum(0)} />
          <PoseIcon variant="left" id="#image2" onClick={() => setImNum(1)} />
          <PoseIcon variant="right" id="#image3" onClick={() => setImNum(2)} />
          <PoseIcon variant="back" id="#image4" onClick={() => setImNum(3)} />
        </div>
        <FooterNav IsPicture ImageRefs={ImageRefs} />
      </div>
    </Layout>
  );
};

export default Data;
