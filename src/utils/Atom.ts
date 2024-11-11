import { Keypoint } from '@tensorflow-models/posenet';
import { atom } from 'recoil';
export type DragKeypoints = ({ isDragging: boolean } & Keypoint)[];

export const imageNumberAtom = atom({
  key: 'imageNumberAtom',
  default: 0,
});

export const dragKeypointsAtom = atom({
  key: 'dragKeypointsAtom',
  default: [] as DragKeypoints,
});

// const bodyNumber = {
//   nose: 0,
//   leftEye: 1,
//   rightEye: 2,
//   leftEar: 3,
//   rightEar: 4,
//   leftShoulder: 5,
//   rightShoulder: 6,
//   leftElbow: 7,
//   rightElbo: 8,
//   leftWrist: 9,
//   rightWrist: 10,
//   leftHip: 11,
//   rightHip: 12,
//   leftKnee: 13,
//   rightKnee: 14,
//   leftAnkle: 15,
//   rightAnkle: 16,
// };
