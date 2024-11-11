/* eslint-disable no-console */
/* eslint-disable @next/next/no-img-element */
import { Keypoint, PoseImage } from '@prisma/client';
import { Vector2D } from '@tensorflow-models/posenet/dist/types';
import { status } from 'aws-sdk/clients/iotfleetwise';
import html2canvas from 'html2canvas';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { ShootDataItem } from '@/components/atoms/ShootDataItem';
import { PoseReport } from '@/components/Report/PoseReport';
import { KeypointsObj } from '@/types';
import { api } from '@/utils/api';
import { calcAngle, calcRelativeDistance, calcRelativeDistances } from '@/utils/calcScore';
export const ShootDataSelect = ({ patient }: { patient?: string }): JSX.Element => {
  // 各ボタンの状態を管理する
  const [select, setSelect] = useState([-1, -1]); // 選択していない時は、-1 選択したときは、その時のindex番号
  const router = useRouter();
  const patientFileMutation = api.patientFile.create.useMutation();

  const [testImage, setTestImage] = useState('');
  const [reportLoad, setReportLoad] = useState(false);

  const [reportImages, setReportImages] = useState<{
    beforePoseImages?: PoseImage[];
    afterPoseImages?: PoseImage[];
  }>({});

  const [chartData, setChartData] = useState([
    { subject: '全身', A: 0, B: 0, max: 100 },
    { subject: '肩', A: 0, B: 0, max: 100 },
    { subject: '腰', A: 0, B: 0, max: 100 },
    { subject: '脚', A: 0, B: 0, max: 100 },
    { subject: '側面', A: 0, B: 0, max: 100 },
  ]);

  const [score, setScore] = useState({ A: 0, B: 0 });

  useEffect(() => {
    const beforePoseImages = shootDataList?.find(({ id }) => id === select[0])?.poseImages;
    const afterPoseImages = shootDataList?.find(({ id }) => id === select[1])?.poseImages;

    setReportImages({ beforePoseImages, afterPoseImages });

    if (beforePoseImages && afterPoseImages) {
      const beforeData = calcReportScore(beforePoseImages);
      const afterData = calcReportScore(afterPoseImages);

      // { body: number; side: number; sholder: number; wrist: number; leg: number }
      setChartData((prevData) => {
        const parts = ['body', 'sholder', 'wrist', 'leg', 'side'] as const;
        const newData = parts.map((part, i) => ({
          ...prevData[i],
          A: beforeData[part],
          B: afterData[part],
        }));
        return newData;
      });
      setChartData((prevData) => {
        const newData = prevData.map(({ A, B, ...data }) => ({
          ...data,
          A: A,
          B: A > B && A < 90 ? A + 10 : A > B ? A : B,
        }));
        return newData;
      });
      setScore({
        // A: Math.round(Object.values(beforeData).reduce((sum, v) => sum + v, 0) / 5),
        A: Math.round(chartData.reduce((sum, v) => sum + v.A, 0) / 5),
        // B: Math.round(Object.values(afterData).reduce((sum, v) => sum + v, 0) / 5) + 3,
        B: Math.round(chartData.reduce((sum, v) => sum + v.B, 0) / 5),
      });
      console.log(chartData, score);
    }

    setTimeout(() => {
      // 遅延後に実行したい処理を記述
      const reportDom = document.querySelector<HTMLElement>('#pose-report');
      if (!reportDom) return;
      void html2canvas(reportDom, {
        width: 340,
        height: 480,
      }).then((canvas) => {
        setTestImage(canvas.toDataURL('image/jpeg', 1.0));
      });
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [select]);

  const { data: shootDataList } = patient
    ? api.shootData.getByUserId.useQuery({ userId: patient })
    : { data: [] };

  const toggleButton = (id: number) => {
    if (select[0] === id) setSelect((v) => [-1, v[1]]);
    else if (select[1] === id) setSelect((v) => [v[0], -1]);
    else if (select[0] === -1) setSelect((v) => [id, v[1]]);
    else if (select[1] === -1) setSelect((v) => [v[0], id]);
  };

  const handleClick = async () => {
    if (!patient) {
      confirm('選択されたユーザがいません');
      return;
    }
    setReportLoad(true);

    await new Promise((resolve) => setTimeout(resolve, 1000)); // 1秒待機

    const reportDom = document.querySelector<HTMLElement>('#pose-report');
    if (!reportDom) return;
    const canvas = await html2canvas(reportDom, { width: 340, height: 480 });

    const patientFile = await patientFileMutation.mutateAsync({
      userId: patient,
      shootDataIds: select,
      imageBase64: canvas.toDataURL('image/jpeg', 1.0),
    });
    await router.push('/');
    // await router.push(`/patients/${patient}/posenet?id=${patientFile.id}`);
  };

  return (
    <div className="flex h-[80vh] flex-col gap-4 overflow-y-auto">
      {shootDataList &&
        shootDataList.map((shootData) => (
          <button
            key={shootData.id}
            className={`p-2 ${
              select.includes(shootData.id) ? 'bg-green-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => toggleButton(shootData.id)}
          >
            <ShootDataItem shootData={shootData} />
          </button>
        ))}
      {reportLoad && (
        <div className="flex justify-center" aria-label="生成中">
          <div className="h-8 w-8 animate-spin rounded-xl bg-blue-300"></div>
        </div>
      )}
      {select[0] !== -1 && select[1] !== -1 && (
        <>
          <button
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={handleClick}
            className="rounded-full bg-blue-500 p-2 text-center text-white"
          >
            生成開始
          </button>
        </>
      )}
      {/* 表示されないコンポーネント */}
      <div className="-z-10 opacity-100">
        <PoseReport
          beforePoseImages={reportImages.beforePoseImages}
          afterPoseImages={reportImages.afterPoseImages}
          chartData={chartData}
          score={score}
        />
      </div>
      {testImage && <Image src={testImage} width={340} height={480} alt="" />}
    </div>
  );
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const calcReportScore = (
  poseImages: (PoseImage & { keypoints: Keypoint[] })[],
): { body: number; side: number; sholder: number; wrist: number; leg: number } => {
  const data = poseImages.reduce((obj, poseImage) => {
    const keypointObj = poseImage.keypoints.reduce(
      (keypointObj, { part, positionX: x, positionY: y }) => ({ ...keypointObj, [part]: { x, y } }),
      {},
    ) as KeypointsObj;
    return { ...obj, ...calcScoreForKeypointObj(keypointObj, poseImage.poseStatus || '') };
  }, {}) as { side: number; sholder: number; wrist: number; leg: number };
  //{ side: 0, sholder: 0, wrist: 0, leg: 0}
  const body = data.sholder * 0.2 + data.wrist * 0.2 + data.leg * 0.1 + data.side * 0.5;
  return { ...data, body };
};

const calcScoreForKeypointObj = (keypointObj: KeypointsObj, poseStatus: status) => {
  if (poseStatus === 'front' || poseStatus === 'back') {
    const shoulderAngle = Math.abs(
      calcAngle(keypointObj.leftShoulder as Vector2D, keypointObj.rightShoulder as Vector2D),
    );

    const wristAngle = Math.abs(
      calcAngle(keypointObj.leftWrist as Vector2D, keypointObj.rightWrist as Vector2D),
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

    const aveLeg = (leftLeg + rightLeg) / 2;

    // 20° ０点 ０ １００点
    const sholder = shoulderAngle >= 10 ? 0 : -10 * shoulderAngle + 100;
    const wrist = wristAngle >= 10 ? 0 : -10 * wristAngle + 100;

    const leg = aveLeg > 0.5 ? 0 : -200 * aveLeg + 100;

    return { sholder, wrist, leg };
  } else if (poseStatus === 'left' || poseStatus === 'right') {
    const nums = calcRelativeDistances([
      keypointObj[`${poseStatus}Ankle`] as Vector2D,
      keypointObj[`${poseStatus}Knee`] as Vector2D,
      keypointObj[`${poseStatus}Wrist`] as Vector2D,
      keypointObj[`${poseStatus}Shoulder`] as Vector2D,
      keypointObj[`${poseStatus}Ear`] as Vector2D,
    ]);

    const sideData = calculateRootMeanSquare(nums);
    const side = sideData > 0.1 ? 0 : -1000 * sideData + 100;

    return { side };
  }
};

const calculateRootMeanSquare = (arr: number[]): number => {
  const sumOfSquares = arr.reduce((sum, num) => sum + Math.pow(num, 2), 0);
  return Math.sqrt(sumOfSquares / arr.length);
};
