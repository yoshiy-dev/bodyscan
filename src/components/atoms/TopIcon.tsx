/* eslint-disable tailwindcss/classnames-order */
/* eslint-disable tailwindcss/no-custom-classname */
import {
  CameraIcon,
  ChartBarIcon,
  HomeIcon,
  ListBulletIcon,
  UserPlusIcon,
} from '@heroicons/react/24/outline';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: keyof typeof ButtonIconVariant;
};

const ButtonIconVariant = {
  home: <HomeIcon className="h-12 w-12" />,
  repo: <ChartBarIcon className="h-12 w-12" />,
  camera: <CameraIcon className="h-12 w-12" />,
  patient: <UserPlusIcon className="h-12 w-12" />,
  list: <ListBulletIcon className="h-12 w-12" />,
} as const;

export const ButtonIcon: React.FC<ButtonProps> = ({ variant, ...buttonHTMLAttributes }) => {
  return (
    <button role="button" {...buttonHTMLAttributes}>
      <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-white opacity-60 shadow-[0px_0px_80px_3px] shadow-primary-focus backdrop-blur-sm duration-500 hover:scale-105">
        {ButtonIconVariant[variant]}
      </div>
    </button>
  );
};
