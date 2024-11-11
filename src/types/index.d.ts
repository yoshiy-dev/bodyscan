export type Patient = {
  id: string;
  name: {
    full: string;
    initial: string;
  };
  age: number;
  dob: string;
  sex: string;
  height: number;
  weight: number;
  BloodType: string;
  visitingDate?: string;
  email: string;
  telNumber: string;
  address: string;
  postalCode: string;
};

export type Posenet = {
  id: string;
  imageUrl: string;
  score: number;
};

export type Report = {
  id: string;
  title: string;
  description: string;
};

export type KeypointsObj = {
  leftEar: Vector2D;
  leftElbow: Vector2D;
  leftEye: Vector2D;
  leftHip: Vector2D;
  leftKnee: Vector2D;
  leftShoulder: Vector2D;
  leftWrist: Vector2D;
  nose: Vector2D;
  rightAnkle: Vector2D;
  rightEar: Vector2D;
  rightElbow: Vector2D;
  rightEye: Vector2D;
  rightHip: Vector2D;
  rightKnee: Vector2D;
  rightShoulder: Vector2D;
  rightWrist: Vector2D;
  leftAnkle: Vector2D;
};
