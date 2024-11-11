import { Vector2D } from '@tensorflow-models/posenet/dist/types';
import React, { useEffect, useState } from 'react';
import { Stage, Layer, Image as RKImage, Line } from 'react-konva';
import { SetterOrUpdater, useRecoilState } from 'recoil';

import Point from '@/components/Point';
import { ImagePose } from '@/hooks/useCamera';
import { DragKeypoints, dragKeypointsAtom } from '@/utils/Atom';

const StageComponent: React.FC<{ image: string; pose: ImagePose; imNum: number }> = ({
  image,
  pose,
  imNum,
}) => {
  const [imageEle, setImage] = useState<HTMLImageElement>();
  const [poseEle, setPoseEle] = useState<JSX.Element>();
  const [dragKeypoints, setDragKeypoints] = useRecoilState(dragKeypointsAtom);

  useEffect(() => {
    if (pose.pose?.keypoints) {
      setDragKeypoints(pose.pose.keypoints.map((keypoint) => ({ isDragging: false, ...keypoint })));
    }
    const newImage = new Image();
    newImage.src = image;
    newImage.addEventListener('load', () => setImage(newImage));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image, pose.pose?.keypoints, pose.width, pose.height, window.innerWidth, setDragKeypoints]);

  useEffect(() => {
    if (!pose.width || !pose.height || !dragKeypoints.length) return;
    const scale = window.innerWidth / pose.width;

    const keypointObj = dragKeypoints.reduce((keypointObj, { part, position, score }) => {
      return { ...keypointObj, [part]: { position, score } };
    }, {}) as KeypointsScoreObj;

    setPoseEle(drawPose(scale, imNum, keypointObj, dragKeypoints, setDragKeypoints));
  }, [dragKeypoints, imNum, pose.height, pose.width, setDragKeypoints]);

  if (!pose.width || !pose.height) return <></>;

  const scale = window.innerWidth / pose.width;
  const width = pose.width * scale;
  const height = pose.height * scale;
  return (
    <Stage width={width} height={height}>
      <Layer>
        <RKImage image={imageEle} width={width} height={height} />
      </Layer>
      <Layer>{poseEle}</Layer>
    </Stage>
  );
};

export default StageComponent;

const drawPose = (
  scale: number,
  imNum: number,
  keypointObj: KeypointsScoreObj,
  dragKeypoints: DragKeypoints,
  setDragKeypoints: SetterOrUpdater<DragKeypoints>,
) => {
  if (imNum === 1) {
    return (
      <>
        {leftLines.map((line, index) => {
          const p1 = keypointObj[line[0]];
          const p2 = keypointObj[line[1]];
          if (p1.score < 0.6 || p2.score < 0.6) return <></>;
          return (
            <Line
              key={index}
              points={[
                p1.position.x * scale,
                p1.position.y * scale,
                p2.position.x * scale,
                p2.position.y * scale,
              ]}
              stroke="orange"
              strokeWidth={4}
              tension={0.5}
            />
          );
        })}
        {dragKeypoints.map(({ position, part, score }, i) =>
          ['leftEar', 'leftHip', 'leftKnee', 'leftShoulder', 'leftWrist', 'leftAnkle'].includes(
            part,
          ) && score > 0.6 ? (
            <Point
              key={i}
              position={position}
              scale={scale}
              dragKeypoints={dragKeypoints}
              setDragKeypoints={setDragKeypoints}
              index={i}
            />
          ) : (
            <></>
          ),
        )}
      </>
    );
  }
  if (imNum === 2) {
    return (
      <>
        {rightLines.map((line, index) => {
          const p1 = keypointObj[line[0]];
          const p2 = keypointObj[line[1]];
          if (p1.score < 0.6 || p2.score < 0.6) return <></>;
          return (
            <Line
              key={index}
              points={[
                p1.position.x * scale,
                p1.position.y * scale,
                p2.position.x * scale,
                p2.position.y * scale,
              ]}
              stroke="orange"
              strokeWidth={4}
              tension={0.5}
            />
          );
        })}
        {dragKeypoints.map(({ position, part, score }, i) =>
          [
            'rightEar',
            'rightHip',
            'rightKnee',
            'rightShoulder',
            'rightWrist',
            'rightAnkle',
          ].includes(part) && score > 0.6 ? (
            <Point
              key={i}
              position={position}
              scale={scale}
              dragKeypoints={dragKeypoints}
              setDragKeypoints={setDragKeypoints}
              index={i}
            />
          ) : (
            <></>
          ),
        )}
      </>
    );
  }
  return (
    <>
      {lines.map((line, index) => {
        const p1 = keypointObj[line[0]];
        const p2 = keypointObj[line[1]];
        if (p1.score < 0.6 || p2.score < 0.6) return <></>;
        return (
          <Line
            key={index}
            points={[
              p1.position.x * scale,
              p1.position.y * scale,
              p2.position.x * scale,
              p2.position.y * scale,
            ]}
            stroke="orange"
            strokeWidth={4}
            tension={0.5}
          />
        );
      })}
      {dragKeypoints.map(({ position, part, score }, i) =>
        ['nose', 'leftEye', 'rightEye'].includes(part) || score < 0.6 ? (
          <></>
        ) : (
          <Point
            key={i}
            position={position}
            scale={scale}
            dragKeypoints={dragKeypoints}
            setDragKeypoints={setDragKeypoints}
            index={i}
          />
        ),
      )}
    </>
  );
};

type KeypointsScoreObj = {
  leftEar: { position: Vector2D; score: number };
  leftElbow: { position: Vector2D; score: number };
  leftEye: { position: Vector2D; score: number };
  leftHip: { position: Vector2D; score: number };
  leftKnee: { position: Vector2D; score: number };
  leftShoulder: { position: Vector2D; score: number };
  leftWrist: { position: Vector2D; score: number };
  nose: { position: Vector2D; score: number };
  rightAnkle: { position: Vector2D; score: number };
  rightEar: { position: Vector2D; score: number };
  rightElbow: { position: Vector2D; score: number };
  rightEye: { position: Vector2D; score: number };
  rightHip: { position: Vector2D; score: number };
  rightKnee: { position: Vector2D; score: number };
  rightShoulder: { position: Vector2D; score: number };
  rightWrist: { position: Vector2D; score: number };
  leftAnkle: { position: Vector2D; score: number };
};

const leftLines = [
  ['leftShoulder', 'leftElbow'],
  ['leftShoulder', 'leftHip'],
  ['leftElbow', 'leftWrist'],
  ['leftHip', 'leftKnee'],
  ['leftKnee', 'leftAnkle'],
] as const;

const rightLines = [
  ['rightShoulder', 'rightElbow'],
  ['rightShoulder', 'rightHip'],
  ['rightElbow', 'rightWrist'],
  ['rightHip', 'rightKnee'],
  ['rightKnee', 'rightAnkle'],
] as const;

const lines = [
  ['leftShoulder', 'rightShoulder'],
  ['leftShoulder', 'leftElbow'],
  ['leftElbow', 'leftWrist'],
  ['rightShoulder', 'rightElbow'],
  ['rightElbow', 'rightWrist'],
  ['leftShoulder', 'leftHip'],
  ['rightShoulder', 'rightHip'],
  ['leftHip', 'rightHip'],
  ['leftHip', 'leftKnee'],
  ['leftKnee', 'leftAnkle'],
  ['rightHip', 'rightKnee'],
  ['rightKnee', 'rightAnkle'],
] as const;
