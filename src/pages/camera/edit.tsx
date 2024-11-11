import { Vector2D } from '@tensorflow-models/posenet/dist/types';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { AngleCard } from '@/components/atoms/AngleCard';
import Layout from '@/components/Layout';
import { FooterNav } from '@/components/Organisms/FooterNav';
import { ImagePose } from '@/hooks/useCamera';
import useSessionStorage from '@/hooks/useSessionStorage';
import { KeypointsObj } from '@/types';
import { DragKeypoints, dragKeypointsAtom } from '@/utils/Atom';
import { calcAngle, calcRelativeDistance, calcRelativeDistances } from '@/utils/calcScore';

const StageComponent = dynamic(() => import('@/components/StageComponent'), { ssr: false });

const Edit: React.FC = () => {
  const router = useRouter();
  const userId = router.query.userId as string;
  const num = (router.query.imageNumber as string | undefined) || '4';
  const imNum = Number(num) - 1;
  const [image] = useSessionStorage(`image${num}`, '');
  const [pose] = useSessionStorage<ImagePose>(`pose${num}`, {});
  const dragKeypoints = useRecoilValue(dragKeypointsAtom);

  const [scores, setScores] = useState({
    front: { shoulderAngle: 0, wristAngle: 0, leftLeg: 0, rightLeg: 0 },
    side: [0, 0, 0, 0],
  });

  useEffect(() => {
    calcAngles(dragKeypoints);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dragKeypoints]);

  const calcAngles = (dragKeypoints: DragKeypoints) => {
    if (!dragKeypoints.length) return;
    const keypointObj = dragKeypoints.reduce((keypointObj, { part, position }) => {
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

  return (
    <Layout IsHeaderNav slug={`/camera/data?userId=${userId}`}>
      <div className="relative">
        <div className="absolute left-8 top-28 z-20 flex flex-col justify-center gap-4">
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
        <StageComponent image={image} pose={pose} imNum={imNum} />
        <FooterNav IsSave />
      </div>
    </Layout>
  );
};

export default Edit;
