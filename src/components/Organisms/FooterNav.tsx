/* eslint-disable tailwindcss/classnames-order */
/* eslint-disable tailwindcss/no-custom-classname */

import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRecoilState, useRecoilValue } from 'recoil';

import { Button } from '@/components/atoms/Button';
import useCamera, { ImagePose } from '@/hooks/useCamera';
import useSessionStorage from '@/hooks/useSessionStorage';
import { dragKeypointsAtom, imageNumberAtom } from '@/utils/Atom';

type FooterProps = {
  IsShutter?: boolean;
  IsPicture?: boolean;
  IsImage?: boolean;
  IsSave?: boolean;
  capture?: () => void;
  ImageRefs?: (HTMLCanvasElement | null)[];
};

export const FooterNav = ({
  IsShutter,
  IsPicture,
  IsSave,
  capture,
  ImageRefs,
  IsImage,
}: FooterProps): JSX.Element => {
  const router = useRouter();
  const num = (router.query.imageNumber as string | undefined) || '1';
  const [pose, setPose] = useSessionStorage<ImagePose>(`pose${num}`, {});
  const [dragKeypoints] = useRecoilState(dragKeypointsAtom);
  const imNum = useRecoilValue(imageNumberAtom);

  const userId = router.query.userId;
  const { saveImage } = useCamera();
  const handleClick = () => {
    if (capture) {
      // シャッター音の再生
      const shutterSound = new Audio(`./sounds/Camera-Phone03-1.mp3`);
      void shutterSound.play();
      void capture();
    }
  };
  const handleSaveClick = () => {
    if (!ImageRefs) return;
    const Images = ImageRefs.map((ele) => ele?.toDataURL('image/jpeg', 0.5) || '');
    saveImage(Images);
  };

  const handleSavePosePoint = () => {
    if (!IsSave) return;
    // 画像を保存
    setPose({
      width: pose.width,
      height: pose.height,
      pose: {
        score: pose.pose?.score || 0,
        keypoints: dragKeypoints.map(({ isDragging: _, ...keypoint }) => keypoint),
      },
    });

    const userId = router.query.userId as string;
    const num = router.query.imageNumber as string;
    const queryParams = `?userId=${userId}#image${num}`;
    void router.push(`/camera/data${queryParams}`);
  };

  return (
    <footer className="fixed bottom-0 z-20 h-36 w-full touch-none items-center rounded-lg bg-white text-black">
      {IsShutter && (
        <ul className="flex h-32 w-full items-center justify-around text-center text-2xl">
          <li className="basis-1/3">
            <Link href={'/'}>キャンセル</Link>
          </li>
          <li className="flex basis-1/3 items-center justify-center ">
            {!IsImage && (
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary">
                <button onClick={handleClick} className="h-16 w-16 rounded-full bg-white" />
              </div>
            )}
          </li>
          <li className="basis-1/3">
            <Link href={{ pathname: '/camera/data', query: { userId } }}>結果確認</Link>
          </li>
        </ul>
      )}
      {IsPicture && (
        <div className="flex items-center justify-around text-center">
          <div className="basis-1/3" />
          <ul className="flex h-32 basis-1/3 items-center justify-center gap-10">
            <div
              className={`h-4 w-14 rounded-md ${imNum === 0 ? 'bg-primary-focus' : 'bg-gray-300'}`}
            />
            <div
              className={`h-4 w-14 rounded-md ${imNum === 1 ? 'bg-primary-focus' : 'bg-gray-300'}`}
            />
            <div
              className={`h-4 w-14 rounded-md ${imNum === 2 ? 'bg-primary-focus' : 'bg-gray-300'}`}
            />
            <div
              className={`h-4 w-14 rounded-md ${imNum === 3 ? 'bg-primary-focus' : 'bg-gray-300'}`}
            />
          </ul>
          <div className="basis-1/3 duration-300 hover:scale-105" onClick={handleSaveClick}>
            <Link
              href={'/'}
              className="rounded-full border border-primary-content px-6 py-4 text-lg"
            >
              撮影データ保存
            </Link>
          </div>
        </div>
      )}
      {IsSave && (
        <div className="relative flex h-28 w-full items-center justify-center">
          {/* <div className="absolute top-[-80px] rounded-lg bg-black/30 p-4 text-white">
            ポイントを正しい位置に調整してください
          </div> */}
          <Button variant="save" onClick={handleSavePosePoint} />
        </div>
      )}
    </footer>
  );
};
