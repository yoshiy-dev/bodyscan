/* eslint-disable tailwindcss/classnames-order */
/* eslint-disable tailwindcss/no-custom-classname */
import Image from 'next/image';

type PoseIconProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: keyof typeof PoseIconVariant;
  id?: string;
};

const PoseIconVariant = {
  front: ['/PoseIcon/front.svg', '#image1'],
  left: ['/PoseIcon/left.svg', '#image2'],
  right: ['/PoseIcon/right.svg', '#image3'],
  back: ['/PoseIcon/front.svg', '#image4'],
} as const;

export const PoseIcon: React.FC<PoseIconProps> = ({ variant, id, ...buttonHTMLAttributes }) => {
  return (
    <>
      <a href={id}>
        <button role="button" {...buttonHTMLAttributes}>
          <div className="flex h-28 w-28 flex-col items-center justify-center rounded-lg bg-white text-center text-sm opacity-60 shadow-[0px_0px_50px_5px] shadow-primary-focus backdrop-blur-sm hover:bg-primary">
            <Image
              src={PoseIconVariant[variant][0]}
              width={70}
              height={70}
              alt="Picture of the author"
            />
            {variant}
          </div>
        </button>
      </a>
    </>
  );
};
