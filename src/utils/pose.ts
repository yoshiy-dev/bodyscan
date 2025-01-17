/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable*/
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
import * as tf from '@tensorflow/tfjs';
import * as posenet from '@tensorflow-models/posenet';

const color = '#f97316';
const boundingBoxColor = 'red';
const lineWidth = 5;

export const tryResNetButtonName = 'tryResNetButton';
export const tryResNetButtonText = '[New] Try ResNet50';
const tryResNetButtonTextCss = 'width:100%;text-decoration:underline;';
const tryResNetButtonBackgroundCss = 'background:#e61d5f;';

function isAndroid() {
  return /Android/i.test(navigator.userAgent);
}

function isiOS() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

export function isMobile() {
  return isAndroid() || isiOS();
}

// function setDatGuiPropertyCss(propertyText: string, liCssString: string, spanCssString = '') {
//   const spans = document.getElementsByClassName('property-name');
//   for (let i = 0; i < spans.length; i++) {
//     const text = spans[i].textContent || spans[i].innerText;
//     if (text == propertyText) {
//       spans[i].parentNode.parentNode.style = liCssString;
//       if (spanCssString !== '') {
//         spans[i].style = spanCssString;
//       }
//     }
//   }
// }

// export function updateTryResNetButtonDatGuiCss() {
//   setDatGuiPropertyCss(tryResNetButtonText, tryResNetButtonBackgroundCss, tryResNetButtonTextCss);
// }

/**
 * Toggles between the loading UI and the main canvas UI.
 */
// export function toggleLoadingUI(showLoadingUI: any, loadingDivId = 'loading', mainDivId = 'main') {
//   if (showLoadingUI) {
//     document.getElementById(loadingDivId).style.display = 'block';
//     document.getElementById(mainDivId).style.display = 'none';
//   } else {
//     document.getElementById(loadingDivId).style.display = 'none';
//     document.getElementById(mainDivId).style.display = 'block';
//   }
// }

function toTuple({ y, x }: { y: any; x: any }) {
  return [y, x];
}

export function drawPoint(
  ctx: {
    beginPath: () => void;
    arc: (arg0: any, arg1: any, arg2: any, arg3: number, arg4: number) => void;
    fillStyle: any;
    fill: () => void;
  },
  y: number,
  x: number,
  r: number,
  color: string,
) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
}

/**
 * Draws a line on a canvas, i.e. a joint
 */
export function drawSegment(
  [ay, ax]: any[],
  [by, bx]: any[],
  color: string,
  scale: number,
  ctx: {
    beginPath: () => void;
    moveTo: (arg0: number, arg1: number) => void;
    lineTo: (arg0: number, arg1: number) => void;
    lineWidth: number;
    strokeStyle: any;
    stroke: () => void;
  },
) {
  ctx.beginPath();
  ctx.moveTo(ax * scale, ay * scale);
  ctx.lineTo(bx * scale, by * scale);
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = color;
  ctx.stroke();
}

/**
 * Draws a pose skeleton by looking up all adjacent keypoints/joints
 */
export function drawSkeleton(
  keypoints: posenet.Keypoint[],
  minConfidence: number,
  ctx: CanvasRenderingContext2D | null,
  scale = 1,
) {
  const adjacentKeyPoints = posenet.getAdjacentKeyPoints(keypoints, minConfidence);

  adjacentKeyPoints.forEach((keypoints) => {
    if (ctx)
      drawSegment(
        toTuple(keypoints[0].position),
        toTuple(keypoints[1].position),
        'orange',
        scale,
        ctx,
      );
  });
}

/**
 * Draw pose keypoints onto a canvas
 */
export function drawKeypoints(
  keypoints: string | any[],
  minConfidence: number,
  ctx: CanvasRenderingContext2D | null,
  scale = 1,
) {
  for (let i = 0; i < keypoints.length; i++) {
    const keypoint = keypoints[i];
    if (keypoint.part && ['nose', 'leftEye', 'rightEye'].includes(keypoint.part)) continue;

    if (keypoint.score < minConfidence) {
      continue;
    }

    const { y, x } = keypoint.position;
    if (ctx) drawPoint(ctx, y * scale, x * scale, 10, '#f97316');
  }
}

/**
 * Draw the bounding box of a pose. For example, for a whole person standing
 * in an image, the bounding box will begin at the nose and extend to one of
 * ankles
 */
export function drawBoundingBox(
  keypoints: posenet.Keypoint[],
  ctx: {
    rect: (arg0: number, arg1: number, arg2: number, arg3: number) => void;
    strokeStyle: string;
    stroke: () => void;
  },
) {
  const boundingBox = posenet.getBoundingBox(keypoints);

  ctx.rect(
    boundingBox.minX,
    boundingBox.minY,
    boundingBox.maxX - boundingBox.minX,
    boundingBox.maxY - boundingBox.minY,
  );

  ctx.strokeStyle = boundingBoxColor;
  ctx.stroke();
}

/**
 * Converts an arary of pixel data into an ImageData object
 */
export async function renderToCanvas(
  a: { shape: [any, any]; data: () => any },
  ctx: { putImageData: (arg0: ImageData, arg1: number, arg2: number) => void },
) {
  const [height, width] = a.shape;
  const imageData = new ImageData(width, height);

  const data = await a.data();

  for (let i = 0; i < height * width; ++i) {
    const j = i * 4;
    const k = i * 3;

    imageData.data[j + 0] = data[k + 0];
    imageData.data[j + 1] = data[k + 1];
    imageData.data[j + 2] = data[k + 2];
    imageData.data[j + 3] = 255;
  }

  ctx.putImageData(imageData, 0, 0);
}

/**
 * Draw an image on a canvas
 */
export function renderImageToCanvas(
  image: any,
  size: any[],
  canvas: { width: any; height: any; getContext: (arg0: string) => any },
) {
  canvas.width = size[0];
  canvas.height = size[1];
  const ctx = canvas.getContext('2d');

  ctx.drawImage(image, 0, 0);
}

/**
 * Draw heatmap values, one of the model outputs, on to the canvas
 * Read our blog post for a description of PoseNet's heatmap outputs
 * https://medium.com/tensorflow/real-time-human-pose-estimation-in-the-browser-with-tensorflow-js-7dd0bc881cd5
 */
export function drawHeatMapValues(
  heatMapValues: { mul: (arg0: tf.Scalar) => any },
  outputStride: string | number | boolean | Uint8Array,
  canvas: { getContext: (arg0: string) => any },
) {
  const ctx = canvas.getContext('2d');
  const radius = 5;
  const scaledValues = heatMapValues.mul(tf.scalar(outputStride, 'int32'));

  drawPoints(ctx, scaledValues, radius, color);
}

/**
 * Used by the drawHeatMapValues method to draw heatmap points on to
 * the canvas
 */
function drawPoints(
  ctx: {
    beginPath: () => void;
    arc: (arg0: any, arg1: any, arg2: any, arg3: number, arg4: number) => void;
    fillStyle: any;
    fill: () => void;
  },
  points: { buffer: () => any[] },
  radius: number,
  color: string,
) {
  const data = points.buffer().values as any;

  for (let i = 0; i < data.length; i += 2) {
    const pointY = data[i];
    const pointX = data[i + 1];

    if (pointX !== 0 && pointY !== 0) {
      ctx.beginPath();
      ctx.arc(pointX, pointY, radius, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
    }
  }
}

/**
 * Draw offset vector values, one of the model outputs, on to the canvas
 * Read our blog post for a description of PoseNet's offset vector outputs
 * https://medium.com/tensorflow/real-time-human-pose-estimation-in-the-browser-with-tensorflow-js-7dd0bc881cd5
 */
// export function drawOffsetVectors(
//     heatMapValues, offsets, outputStride, scale = 1, ctx) {
//   const offsetPoints =
//       posenet.singlePose.getOffsetPoints(heatMapValues, outputStride, offsets);

//   const heatmapData = heatMapValues.buffer().values;
//   const offsetPointsData = offsetPoints.buffer().values;

//   for (let i = 0; i < heatmapData.length; i += 2) {
//     const heatmapY = heatmapData[i] * outputStride;
//     const heatmapX = heatmapData[i + 1] * outputStride;
//     const offsetPointY = offsetPointsData[i];
//     const offsetPointX = offsetPointsData[i + 1];

//     drawSegment(
//         [heatmapY, heatmapX], [offsetPointY, offsetPointX], color, scale, ctx);
//   }
// }
