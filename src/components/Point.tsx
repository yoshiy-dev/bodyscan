import { Vector2D } from '@tensorflow-models/posenet/dist/types';
import React from 'react';
import { Circle } from 'react-konva';
import { SetterOrUpdater } from 'recoil';

import { DragKeypoints } from '@/utils/Atom';

type PointProps = {
  position: Vector2D;
  scale: number;
  index: number;
  setDragKeypoints: SetterOrUpdater<DragKeypoints>;
  dragKeypoints: DragKeypoints;
};
const Point: React.FC<PointProps> = ({
  position,
  scale,
  index,
  setDragKeypoints,
  dragKeypoints,
}) => {
  const handleDragEnd = (position: Vector2D) => {
    setDragKeypoints((prevList) =>
      prevList.map((keypoint, i) =>
        i === index ? { ...keypoint, position, isDragging: false } : keypoint,
      ),
    );
  };

  const hendleDragStart = () => {
    setDragKeypoints((prevList) =>
      prevList.map((keypoint, i) => (i === index ? { ...keypoint, isDragging: true } : keypoint)),
    );
  };

  return (
    <Circle
      x={position.x * scale}
      y={position.y * scale}
      scaleX={scale}
      scaleY={scale}
      radius={10}
      draggable
      fill={dragKeypoints[index].isDragging ? '#9a3412' : '#f97316'}
      onDragStart={() => hendleDragStart()}
      onDragEnd={(e) => {
        handleDragEnd({ x: e.target.x() / scale, y: e.target.y() / scale });
      }}
    />
  );
};

export default Point;
