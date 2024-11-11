import { Vector2D } from '@tensorflow-models/posenet/dist/types';

export const calcAngle = (p1: Vector2D, p2: Vector2D): number => {
  const angleRadians = Math.atan2(p2.y - p1.y, p2.x - p1.x);
  // 角度をラジアンから弧度法にして変換（有効数字2桁）
  let angleDegrees = 180 - angleRadians * (180 / Math.PI);
  // -90 ~ 90 の範囲に修正
  if (angleDegrees > 180) angleDegrees = angleDegrees - 360;
  if (angleDegrees < -180) angleDegrees = angleDegrees + 360;
  if (angleDegrees < -90) angleDegrees = angleDegrees + 180;
  if (angleDegrees > 90) angleDegrees = angleDegrees - 180;

  return Math.round(angleDegrees * 100) / 100;
};

export const calcRelativeDistance = (p1: Vector2D, p2: Vector2D, p3: Vector2D): number => {
  // p1とp3を通る直線の方程式を求める。y = mx + cの形式とする
  const m = (p3.y - p1.y) / (p3.x - p1.x);
  const c = p1.y - m * p1.x;

  // p2と直線との距離を計算する
  const distance = Math.abs(m * p2.x - p2.y + c) / Math.sqrt(m * m + 1);

  // p1とp3間の距離を計算する
  const lineLength = Math.sqrt((p3.x - p1.x) ** 2 + (p3.y - p1.y) ** 2);

  // 距離の割合を返す
  return Math.round((distance / lineLength) * 100) / 100;
};

// 5点を引数にして、1点目と5点目の距離で割合を算出 x方向の距離をのずれを算出
type Points5 = [Vector2D, Vector2D, Vector2D, Vector2D, Vector2D];
type Nums5 = [number, number, number, number, number];
export const calcRelativeDistances = (points: Points5): Nums5 => {
  const distBase = Math.abs(points[4].y - points[0].y);

  const distances = points.slice(1).map((point) => {
    const distFromFirst = Math.abs(point.x - points[0].x);
    return Math.round((distFromFirst / distBase) * 100) / 100;
  }) as Nums5;

  return distances;
};
