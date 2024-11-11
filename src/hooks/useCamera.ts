import * as posenet from '@tensorflow-models/posenet';
import { Vector2D } from '@tensorflow-models/posenet/dist/types';
import { useRouter } from 'next/router';
import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';

import useSessionStorage from '@/hooks/useSessionStorage';
import { api } from '@/utils/api';
import { drawKeypoints, drawSkeleton } from '@/utils/pose';

type UseCameraProps = {
  image: string;
  poseNumber: number;
  selectPoseNumber: (num: number) => void;
  webcamRef: RefObject<Webcam>;
  pose: ImagePose;
  capture: () => void;
  canvasRef: RefObject<HTMLCanvasElement>;
  runPosenet: () => Promise<void>;
  saveImage: (Images: string[]) => void;
  removeImage: () => void;
};

export type ImagePose = {
  pose?: posenet.Pose;
  width?: number;
  height?: number;
};

const useCamera = (): UseCameraProps => {
  const router = useRouter();
  const [image, setImage] = useState('');
  const [pose, setPose] = useState<ImagePose>({});
  const shootData = api.shootData.create.useMutation();

  const [poseNumber, setPoseNumber] = useState(0);
  const [image1, setImage1, removeImage1] = useSessionStorage('image1', '');
  const [image2, setImage2, removeImage2] = useSessionStorage('image2', '');
  const [image3, setImage3, removeImage3] = useSessionStorage('image3', '');
  const [image4, setImage4, removeImage4] = useSessionStorage('image4', '');
  const [pose1, setPose1, removePose1] = useSessionStorage<ImagePose>('pose1', {});
  const [pose2, setPose2, removePose2] = useSessionStorage<ImagePose>('pose2', {});
  const [pose3, setPose3, removePose3] = useSessionStorage<ImagePose>('pose3', {});
  const [pose4, setPose4, removePose4] = useSessionStorage<ImagePose>('pose4', {});

  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const detectWebcamFeed = async (posenet_model: posenet.PoseNet) => {
    if (
      typeof webcamRef.current !== 'undefined' &&
      webcamRef.current !== null &&
      webcamRef.current.video?.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const width = webcamRef.current.video.videoWidth;
      const height = webcamRef.current.video.videoHeight;
      // Set video width
      webcamRef.current.video.width = width;
      webcamRef.current.video.height = height;
      // Make Estimation
      const pose = await posenet_model.estimateSinglePose(video);
      // eslint-disable-next-line no-console
      console.log(pose);
      drawResult(pose, width, height, canvasRef);
      setPose({ pose, width, height });
    }
  };

  const runPosenet = async () => {
    const posenet_model = await posenet.load();

    setInterval(() => {
      void detectWebcamFeed(posenet_model);
    }, 1000);
  };

  useEffect(() => {
    if (poseNumber === 0) {
      setImage(image1);
      setPose(pose1);
    } else if (poseNumber === 1) {
      setImage(image2);
      setPose(pose2);
    } else if (poseNumber === 2) {
      setImage(image3);
      setPose(pose3);
    } else if (poseNumber === 3) {
      setImage(image4);
      setPose(pose4);
    }
    setTimeout(() => {
      if (pose.pose && pose.width && pose.height)
        drawResult(pose.pose, pose.width, pose.height, canvasRef);
    }, 100); // 0.1秒待機

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [poseNumber, image]);

  const _capture = useCallback(
    (pose: ImagePose) => {
      const imageSrc = webcamRef.current?.getScreenshot();
      if (!imageSrc) return;

      // sessionStorageに画像保存
      if (poseNumber === 0) {
        setImage1(imageSrc);
        setPose1(pose);
      } else if (poseNumber === 1) {
        setImage2(imageSrc);
        setPose2(pose);
      } else if (poseNumber === 2) {
        setImage3(imageSrc);
        setPose3(pose);
      } else if (poseNumber === 3) {
        setImage4(imageSrc);
        setPose4(pose);
      }
      setImage(imageSrc);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [poseNumber],
  );

  const capture = () => _capture(pose);

  const selectPoseNumber = (num: number) => setPoseNumber(num);

  const poseStatusList = ['front', 'left', 'right', 'back'];

  const saveImage = (images: string[]) => {
    const poseImages = [
      { image: images[0], pose: pose1.pose },
      { image: images[1], pose: pose2.pose },
      { image: images[2], pose: pose3.pose },
      { image: images[3], pose: pose4.pose },
    ].map(({ image, pose }, i) => {
      return {
        score: pose?.score || 0,
        imageBase64: image,
        keypoints: pose?.keypoints || [],
        poseStatus: poseStatusList[i],
      };
    });

    const userId = (router.query.userId || 'clj4c0xsl0026o0a4q5tedmts') as string;

    shootData.mutate({
      userId,
      poseImages,
    });
    if (shootData.isError) return;
    removeImage1();
    removeImage2();
    removeImage3();
    removeImage4();
    removePose1();
    removePose2();
    removePose3();
    removePose4();
  };

  const removeImage = () => {
    if (poseNumber === 0) removeImage1();
    else if (poseNumber === 1) removeImage2();
    else if (poseNumber === 2) removeImage3();
    else if (poseNumber === 3) removeImage4();
    setImage('');
  };

  return {
    image,
    removeImage,
    poseNumber,
    selectPoseNumber,
    pose,
    capture,
    webcamRef,
    canvasRef,
    runPosenet,
    saveImage,
  };
};

export default useCamera;

export const drawResult = (
  pose: posenet.Pose,
  videoWidth: number,
  videoHeight: number,
  canvasRef: React.RefObject<HTMLCanvasElement>,
): void => {
  if (!canvasRef.current) return;
  const ctx = canvasRef.current.getContext('2d');
  canvasRef.current.width = videoWidth;
  canvasRef.current.height = videoHeight;
  drawSkeleton(pose['keypoints'], 0.7, ctx);
  drawKeypoints(pose['keypoints'], 0.6, ctx);
};

export const drawImageResult = (
  image: string,
  imagePose: ImagePose,
  canvasRef: React.RefObject<HTMLCanvasElement>,
  option: { poseStatus: string },
): void => {
  if (!canvasRef.current || !imagePose.width || !imagePose.height) return;
  const scale = window.innerWidth / imagePose.width;
  const width = imagePose.width * scale;
  const height = imagePose.height * scale;

  canvasRef.current.width = width;
  canvasRef.current.height = height;

  const ctx = canvasRef.current.getContext('2d');
  const _image = new Image();
  _image.src = image;
  _image.addEventListener('load', () => {
    if (ctx) {
      ctx.drawImage(_image, 0, 0, width, height);
      if (imagePose.pose) {
        // drawSkeleton(imagePose.pose['keypoints'], 0.7, ctx, scale);
        // drawKeypoints(imagePose.pose['keypoints'], 0.6, ctx, scale);
        if (option.poseStatus === 'left') {
          const points = imagePose.pose.keypoints.filter(({ part }) => part === 'leftAnkle');
          if (points.length >= 1) {
            viewLine(canvasRef, points[0].position);
          }
        } else if (option.poseStatus === 'right') {
          const points = imagePose.pose.keypoints.filter(({ part }) => part === 'rightAnkle');
          if (points.length >= 1) {
            viewLine(canvasRef, points[0].position);
          }
        } else {
          const points = imagePose.pose.keypoints.filter(
            ({ part }) => part === 'leftAnkle' || part === 'rightAnkle',
          );
          if (points.length >= 2) {
            const point = getMidpoint(points[0].position, points[1].position);
            viewLine(canvasRef, point);
          }
        }
      }
    }
  });
};

const getMidpoint = (position1: Vector2D, position2: Vector2D) => {
  const midpoint: Vector2D = {
    x: (position1.x + position2.x) / 2,
    y: (position1.y + position2.y) / 2,
  };
  return midpoint;
};
const viewLine = (canvasRef: React.RefObject<HTMLCanvasElement>, position: Vector2D) => {
  const ctx = canvasRef.current?.getContext('2d');
  if (!ctx || !canvasRef.current) return;
  const step = 30; // 線の間隔

  ctx.strokeStyle = 'orange';

  const width = canvasRef.current.width;
  const height = canvasRef.current.height;

  const startX = position.x % step;
  const startY = position.y % step;

  ctx.lineWidth = 1; // 線の太さ
  // 横方向の線を引く
  for (let x = startX; x <= width; x += step) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  // 縦方向の線を引く
  for (let y = startY; y <= height; y += step) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
};
